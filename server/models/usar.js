const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  login: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  favorite: [
    {
      book_id: {
        type: String
      }
    }
  ],
  want_to_read: [
    {
      book_id: {
        type: String
      }
    }
  ],
  reading: [
    {
      book_id: {
        type: String
      }
    }
  ],
  role: {
    type: String
  },
  googleId: {
    type: String
  },
  facebookId: {
    type: String,
    default: 'nema'
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
