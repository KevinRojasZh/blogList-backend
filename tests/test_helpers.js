const User = require('../models/user')

const initialBlogs = user => {
  return [
    {
      title: 'Webs developers',
      author: 'Kevin Rojas',
      url: 'Www.webs.com',
      likes: 7,
      user:user
    },
    {
      title: 'IA the next generation',
      author: 'Juan Ramirez',
      url: 'Www.webs.com',
      likes: 17,
      user:user
    },
  ]
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON() )
}



module.exports = {
  initialBlogs,
  usersInDb
}