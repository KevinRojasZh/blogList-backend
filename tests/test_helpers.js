const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Webs developers',
    author: 'Kevin Rojas',
    url: 'Www.webs.com',
    likes: 7,
  },
  {
    title: 'IA the next generation',
    author: 'Juan Ramirez',
    url: 'Www.webs.com',
    likes: 17,
  },
]
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON() )
}



module.exports = {
  initialBlogs,
  usersInDb
}