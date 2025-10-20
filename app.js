
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog_controller')
const userRouter = require('./controllers/users_controller')
const loginRouter = require('./controllers/login_controller')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')



mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)
/**
 *! LA FUNCION connectToDataBase DEBERIA ESTAR EN LA CARPETA UTILS E IMPORTARLA AQUI
 */
const connectToDataBase = async() => {
  try{
    await mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB')
  }catch(error){
  logger.error('error connecting to MongoDB:', error.message)
  }
}

connectToDataBase()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/blog',middleware.userExtract, blogRouter)
app.use('/api/user', userRouter)
app.use('/api/loggin', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app























