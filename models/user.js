const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    minLength: 3,
    unique: true,
    required:true
  },

  name: {
    type: String,
    minLength: 3
  },

  passwordHass: {
    type: String,
    minLength: 3,
    required:true
  },

  blogs:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

const User = mongoose.model('User', userSchema)

userSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id= returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHass
  }
})

module.exports = User
