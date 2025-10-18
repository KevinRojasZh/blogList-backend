const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')


//-------- METODOS -----------------------------------------

//GET ALL USERS
userRouter.get('/',async (request, response) => {
  const users = await User.find({}).populate('blogs',{ title:1, author:1, likes:1 })
  response.json(users)
})

//POST NEW USER
userRouter.post('/',async(request, response) => {

  const{ userName,name,password } = request.body
  if(password.length < 3){
    return response.status(400).json({ error:'The min length of password is 3 characters' })
  }

  const saltRounds = 10
  const passwordHass = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    name,
    userName,
    passwordHass
  })
  const userSaved = await newUser.save()
  response.status(201).json(userSaved)
})

//GET 1 USER
userRouter.get('/:id',async(request, response) => {
  const id = request.params.id
  const user = await User.findById(id)
  if(user){
    response.json(user)
  }else{
    response.status(400).end()
  }
})

//DELETE 1 USER
userRouter.delete('/:id',async(request, response) => {
  const id = request.params.id
  try{
    await User.findByIdAndDelete(id)
    response.status(204).end()
  }catch(error){
    logger.error('error connecting to MongoDB:', error.message)
  }
})

//MODIFICATE 1 USER
userRouter.patch('/:id',async(request, response) => {
  const id = request.params.id
  const body = request.body
  try{
    const updateUser =  await User.findByIdAndUpdate(id,body,{ new:false,runValidators:true })

    if(!updateUser){
    return response.status(404).json({ error:'User not found' })
    }
    response.status(204).end()
  }catch(error){
    logger.error(error.message)
  }
})



// -----------------------------------------------------


module.exports = userRouter


