const sha256 = require('sha256')
const { verify } = require('jsonwebtoken')
const User = require('../models/usar')
// coding password by sha2 and salt
function changePassword (userPassword) {
  let pass = process.env.salt
  pass += userPassword
  return sha256(pass)
}

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken')

  if (!accessToken) return res.send({ mes: 'no' })

  try {
    const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    req.user = validToken
    if (validToken) {
      console.log('USER TOKEN')
      return next()
    } else {
      console.log('NONONONON TOKEN')
      return res.send({ mes: 'no' })
    }
  } catch (err) {
    // return res.send({ error: err });
  }
}
// for checking unique login and email
const checkEmail = async (user) => {
  try {
    const res = await User.find({ email: user })
    return Array.isArray(res) && res.length === 0
  } catch (err) {
    console.log(err)
    return false
  }
}

const checkLogin = async (user) => {
  try {
    const res = await User.find({ login: user })
    return Array.isArray(res) && res.length === 0
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = { validateToken, changePassword, checkEmail, checkLogin }
