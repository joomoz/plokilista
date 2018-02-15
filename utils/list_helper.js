const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0] || ""
  let mostLikes = 0
  
  blogs.forEach(blog => {
    if(blog.likes > mostLikes) {
      favorite = blog
      mostLikes = blog.likes
    }
    // console.log(mostLikes)
  })

  return favorite
}

module.exports = {
  average,
  dummy,
  totalLikes,
  favoriteBlog
}