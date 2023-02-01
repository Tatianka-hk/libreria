const express = require('express');
const router = express.Router();
const AuthController = require('../autocontrollers/Book')
const {validateToken} =require('../middleware/auth')
router.get('/get', validateToken, AuthController.get_books)
router.post('/add', AuthController.add_book)
router.get('/edit/:id',validateToken, AuthController.get_book)
router.post('/edit/:id', AuthController.edit_book)
module.exports = router;