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

module.exports = {
  average,
  dummy,
  totalLikes
}