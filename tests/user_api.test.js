const { test, after ,beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('Validation the data requiered and the restriction unique the username',() => {

    beforeEach(async() => {
        await User.deleteMany({})
        const passwordHass = await bcrypt.hash('1234',10)
        const newUser = new User ({
            userName:'root',
            name:'kevin rojas',
            passwordHass: passwordHass
        })
        await newUser.save()

    test('Create user',async() => {

        const newUser = {
            userName:'KevinRojas',
            name:'kevin rojas',
            password: '12342'
            }
        await api
            .post('/api/user/')
            .send(newUser)
            .expect(201)
    })

    test('The userName is missing',async() => {
        const newUser = {
                userName:'',
                name:'kevin rojas',
                password: '12342'
                }
        await api
            .post('/api/user/')
            .send(newUser)
            .expect(400)
    })

    test('The password is missing',async() => {
        const newUser = {
                userName:'Juan',
                name:'kevin rojas',
                password: ''
                }
        await api
            .post('/api/user/')
            .send(newUser)
            .expect(400)
    })

    test('The userName already exists',async() => {
        const newUser = {
                userName:'root',
                name:'kevin rojas',
                password: '1213'
                }
        await api
            .post('/api/user/')
            .send(newUser)
            .expect(400)
    })
})

})









after(async () => {
    await mongoose.connection.close()
})