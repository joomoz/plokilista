const mongoose = require('mongoose')

const User = mongoose.model('User', {
  username: { type: String, unique: true},
  name: String,
  passwordHash: String,
  adult: { type: Boolean, default: false },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

module.exports = User