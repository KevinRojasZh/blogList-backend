const { min } = require('lodash')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true,
    minLength:3
  },
  author: String,
  url: {
    type:String,
    required:true,
  },
  likes:{
    type:Number,
    default:0,
    min:0
  }
})

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id= returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Blog
