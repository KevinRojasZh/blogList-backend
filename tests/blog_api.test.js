const { test, after ,beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const assert = require('node:assert')
const app = require('../app')
const helper = require('./test_helpers')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

let tokenUser = null

describe('Api blog test, return json,create... ',() => {

    beforeEach(async() => {
        await User.deleteMany({})
        const passwordHass = await bcrypt.hash('1234',10)
        await User.create({
            userName:'root',
            name:'kevin rojas',
            passwordHass: passwordHass
        })
        const users = await User.find({})
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs(users[0].id))

        const userData = {
        userName:"root",
        password:"1234"
        }

        const logginUser = await api
        .post('/api/loggin')
        .send(userData)
        .expect(200)

        tokenUser =`Bearer ${logginUser.body.token}`
        console.log(tokenUser)
        })

        test('blogs are returned as JSON',async () => {
            await api
            .get('/api/blog')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        })

        test('there are two blogs',async() => {
            const response = await api.get('/api/blog')
            assert.strictEqual(response.body.length, 2)
        })


        test(`The model have id don't _id`,async() => {
            const response = await api.get('/api/blog')
            response.body.map(blog => {
                assert.notDeepStrictEqual(blog.id,undefined)
                assert.deepStrictEqual(blog._id,undefined )
            })
        })


        test('Create a new blog',async() => {
            const newBlog = {
                title: 'Creando Blog con token desde pruebas',
                author: 'Kevin Rojas',
                url: 'Www.aventurasKev.com',
                likes: 32
            }
            const response = await api
            .post('/api/blog')
            .set('Authorization',tokenUser)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


            const newBlosgs = await api.get('/api/blog')
            const newLength = newBlosgs.body.length
            assert.strictEqual(newLength, 3)

            assert.strictEqual(response.body.title, newBlog.title)
            assert.strictEqual(response.body.author, newBlog.author)
            assert.strictEqual(response.body.url, newBlog.url)
            assert.strictEqual(response.body.likes, newBlog.likes)
            assert.ok(response.body.id)
        })

        test('Verifying like is 0',async() => {
            const newBlog = {
                title: 'Kevin y sus aventuras',
                author: 'Kevin Rojas',
                url: 'Www.aventurasKev.com',
                }
            const response = await  api
            .post('/api/blog')
            .set('Authorization',tokenUser)
            .send(newBlog)
            .expect(201)
            .expect('Content-type', /application\/json/)
            assert.strictEqual(response.body.likes, 0)
        })

        test('Verifying required title and url',async() => {
            const newBlog = {
            author: 'Kevin Rojas',
            likes:30
            }
            await api
            .post('/api/blog')
            .set('Authorization',tokenUser)
            .send(newBlog)
            .expect(400)
            })

        test('Delete one blog',async() => {
            const blog = {
            title: 'IA the next generation',
            author: 'Juan Ramirez',
            url: 'Www.webs.com',
            likes: 17
            }

            const response =  await api
            .post('/api/blog')
            .set('Authorization',tokenUser)
            .send(blog)
            .expect(201)
            console.log('BODY:',response.body)
            const idblog = response.body.id
            console.log('tipo de dato:',typeof(idblog))
            console.log('id:',idblog)



            await api
            .delete(`/api/blog/${idblog}`)
            .set('Authorization',tokenUser)
            .expect(204)
            })

        test('Modificate data blog',async() => {
            const dataModificate={
            likes:10
            }
            const blogs = await api
            .get('/api/blog')
            .expect(200)
            .expect('Content-Type', /application\/json/)

            await api
            .patch(`/api/blog/${blogs.body[0].id}`)
            .set('Authorization',tokenUser)
            .send(dataModificate)
            .expect(204)
        })
after(async () => {
    await mongoose.connection.close()
})
})
