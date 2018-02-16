const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }

  const savedBlog = await blog.save()
  response.status(201).json(formatBlog(savedBlog))
})

// blogsRouter.get('/:id', (request, response) => {
//   Note
//     .findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(formatNote(note))
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => {
//       response.status(400).send({ error: 'malformatted id' })
//     })
// })

// blogsRouter.delete('/:id', (request, response) => {
//   Note
//     .findByIdAndRemove(request.params.id)
//     .then(result => {
//       console.log(result)
//       response.status(204).end()
//     })
//     .catch(error => {
//       response.status(400).send({ error: 'malformatted id' })
//     })
// })

// blogsRouter.put('/:id', (request, response) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important
//   }

//   Note
//     .findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(formatNote(updatedNote))
//     })
//     .catch(error => {
//       console.log(error)
//       response.status(400).send({ error: 'malformatted id' })
//     })
// })

module.exports = blogsRouter