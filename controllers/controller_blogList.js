
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


//-------- METODOS -----------------------------------------

//GET ALL BLOGS
blogRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//POST NEW BLOG
blogRouter.post('/',async(request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

//GET 1 BLOG
blogRouter.get('/:id',async(request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if(blog){
    response.json(blog)
  }else{
    response.status(400).end()
  }
})

//DELETE 1 BLOG
blogRouter.delete('/:id',async(request, response) => {
  const id = request.params.id
  try{
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }catch(error){
    logger.error('error connecting to MongoDB:', error.message)
  }
})

//MODIFICATE 1 BLOG
blogRouter.patch('/:id',async(request, response) => {
  const id = request.params.id
  const body = request.body
  try{
    const updateBlog =  await Blog.findByIdAndUpdate(id,body,{ new:false,runValidators:true })

    if(!updateBlog){
    return response.status(404).json({ error:'Blog not found' })
    }
    response.status(204).end()
  }catch(error){
    logger.error(error.message)
  }
})



// -----------------------------------------------------


module.exports = blogRouter


