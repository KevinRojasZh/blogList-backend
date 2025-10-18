const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user') // Importamos el modelo de Usuario
const jwt = require('jsonwebtoken')


//-------- METODOS -----------------------------------------

// GET ALL BLOGS: Ruta para obtener todos los blogs
blogRouter.get('/',async (request, response) => {
// Busca todos los documentos de la colección 'Blog'.
// .populate('user', { userName: 1, name: 1 }) es crucial: reemplaza el ObjectId del campo 'user'
// con los datos reales del usuario (solo userName y name), facilitando la lectura en el frontend.
const blogs = await Blog.find({}).populate('user',{ userName:1, name:1 })
// Envía la lista completa de blogs como respuesta JSON.
  response.json(blogs)
})

// POST NEW BLOG: Ruta para crear un nuevo blog
blogRouter.post('/',async(request, response) => {
  const body = request.body
  const decodeToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodeToken.id){
    response.status(401).json({ error:'token invalid' })
  }
  const user = await User.findById(decodeToken.id)

// Crea una nueva instancia del modelo Blog.
  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
// Vincula el blog al usuario: usa el campo 'user' del esquema y guarda el ObjectId del usuario en un array.
    user:[user._id]
  })

// Guarda el nuevo blog en la base de datos MongoDB.
  const result = await blog.save()

// Actualiza el array 'blogs' del usuario:
// 1. Concatena el ID del nuevo blog ('result._id') al array 'blogs' del objeto 'user'.
  user.blogs = user.blogs.concat(result._id)
// 2. Guarda los cambios en el documento del usuario en la base de datos.
  await user.save()

// Responde con el código 201 Created y los datos del blog creado.
  response.status(201).json(result)
})

// GET 1 BLOG: Ruta para obtener un blog por ID
blogRouter.get('/:id',async(request, response) => {
// Obtiene el ID del blog de los parámetros de la URL.
  const id = request.params.id

// Busca el blog por su ID.
  const blog = await Blog.findById(id)

// Si el blog es encontrado (existe):
  if(blog){
    response.json(blog) // Devuelve el blog.
  }else{
    // Si no es encontrado (es null), responde con 400 Bad Request.
    // NOTA: 404 Not Found es a menudo más apropiado aquí.
    response.status(400).end()
  }
})

// DELETE 1 BLOG: Ruta para borrar un blog por ID
blogRouter.delete('/:id',async(request, response) => {
  const id = request.params.id
  try{
  // Busca y elimina el documento por ID.
    await Blog.findByIdAndDelete(id)

  // Responde con 204 No Content, indicando que la operación fue exitosa pero no hay cuerpo que devolver.
    response.status(204).end()
  }catch(error){
  // Captura errores de la base de datos o de Mongoose (ej. ID no válido).
    logger.error('error connecting to MongoDB:', error.message)
  // No se envía respuesta al cliente aquí, lo que podría colgar la petición. 
  // Lo ideal sería enviar un status 500 o 400 al cliente también.
  }
})

// MODIFICATE 1 BLOG: Ruta para actualizar un blog por ID (PATCH/PUT)
blogRouter.patch('/:id',async(request, response) => {
  const id = request.params.id
  const body = request.body // Datos a actualizar (ej. { likes: 10 })

  try{
    // Busca el blog y aplica las actualizaciones del 'body'.
    // { new: false } indica que devuelva la versión antigua antes de la actualización.
    // { runValidators: true } asegura que las reglas del esquema (ej. minLength) se apliquen a los datos nuevos.
    const updateBlog =  await Blog.findByIdAndUpdate(id,body,{ new:false,runValidators:true })

    // Si findByIdAndUpdate no encuentra el documento, devuelve null.
    if(!updateBlog){
    // Devuelve 404 Not Found si el ID no corresponde a ningún blog.
    return response.status(404).json({ error:'Blog not found' })
    }

    // Si la actualización es exitosa, responde con 204 No Content.
    response.status(204).end()
  }catch(error){
    // Manejo de errores (ej. un valor de likes no válido que falle la validación).
    logger.error(error.message)
    // NOTA: Se debería enviar un 400 Bad Request si es un error de validación.
  }
})


// -----------------------------------------------------


module.exports = blogRouter // Exporta el router para usarlo en 'app.js'


