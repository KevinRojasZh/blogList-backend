const _ = require('lodash')

const dummy =() => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum,blog) => {
    const returned = sum + blog.likes
    return returned
  },0)
}

const favoriteBlog = blogs => {
  let initial = 0
  let favorite = []

  blogs.map(blog => {
    if (blog.likes > initial){
      initial = blog.likes
      favorite = blog
    }
  })
  return favorite
}
const mostBlogs = blogs => {
  const countAuthors = _.countBy(blogs, blog => blog.author)
  const topAuthor = _.maxBy(Object.keys(countAuthors), author => countAuthors[author])
  return {
    author: topAuthor,
    blogs: countAuthors[topAuthor]
  }
}

//---------------HACER ESTE TES--------------------
// const mostlikes = blogs => {
//   const listLikes = _.countBy(blogs, blog => blog.likes)
//   console.log(Object.keys(blogs))
//   //const topAuthor = _.maxBy(Object.keys(countAuthors), author => )
// }
//-------------------------------------------------







module.exports= {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  // mostlikes
}


