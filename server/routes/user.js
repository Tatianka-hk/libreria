const express = require('express');
const router = express.Router();
const AuthController = require('../autocontrollers/Usar')
const {validateToken} =require('../middleware/auth')

router.post('/add_to_favorites',validateToken, AuthController.add_to_favorites)
router.post('/want_to_read',validateToken, AuthController.add_want_to_read)
router.get('/see_fav',validateToken, AuthController.see_fav)
router.get('/see_want_to_read',validateToken, AuthController.see_want_to_reed)
router.post('/delete_from_favorite',validateToken, AuthController.delete_from_favorites)
router.post('/delete_from_gl',validateToken, AuthController.delete_from_want_to_read)

module.exports = router;