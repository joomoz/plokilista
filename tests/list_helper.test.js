const listHelper = require('../utils/list_helper')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'www.dijkstrasblog.com',
    likes: 5,
    __v: 0
  }
]

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    // console.log("calculated likes:", result)

    expect(result).toBe(5)
  })

  test('of a long list is calculated correctly', () => {
    const result = listHelper.totalLikes(initialBlogs)
    // console.log("calculated likes:", result)

    expect(result).toBe(36)
  })

})

describe('favourite blog', () => {
  test('returns correct blog', () => {
    const result = listHelper.favoriteBlog(initialBlogs)

    expect(result).toEqual(initialBlogs[2])
  })

})