const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')


beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjects.map(blog => blog.save()))
})

describe('GET tests:', () => {

  test('all blogs are returned as json', async () => {
    const blogsInDB = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDB.length)
  })

  test('number of blogs is correct', async () => {
    const blogsInDB = await blogsInDb()

    expect(blogsInDB.length).toBe(initialBlogs.length)
  })

  test('one of the blogs is about React patterns', async () => {
    const blogsInDB = await blogsInDb()
    const contents = blogsInDB.map(b => b.title)

    expect(contents).toContain('React patterns')
  })
})

describe('POST tests:', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: "What the flexbox?",
      author: "Wes Bos",
      url: "https://flexbox.io/",
      likes: 99
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDB = await blogsInDb()
    const titles = blogsInDB.map(b => b.title)

    expect(blogsInDB.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain('What the flexbox?')
  })

  test('blog without likes is added with 0 likes ', async () => {
    const newBlog = {
      title: "Title",
      author: "J. Moilanen",
      url: "www.fi.com",
    }
  
    const initialBlogs = await blogsInDb()
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
  
    const response = await blogsInDb()

    const ourBlog = response.filter(blog => blog.title === 'Title');
    // console.log("ourBlog:", ourBlog)
    // console.log("likes:", ourBlog[0].likes)

    expect(ourBlog[0].likes).toBe(0)
    expect(response.length).toBe(initialBlogs.length + 1)
  })

  test('blog without title and url is not saved ', async () => {
    const newBlog = {
      author: "J. Moilanen",
      likes: 99
    }
  
    const initialBlogs = await blogsInDb()
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await blogsInDb()

    expect(response.length).toBe(initialBlogs.length)
  })
})

afterAll(() => {
  server.close()
})