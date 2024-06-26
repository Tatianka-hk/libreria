const express = require('express')
const router = express.Router()
const AuthController = require('../autocontrollers/Auth')
const { validateToken } = require('../middleware/auth')

router.post('/register', AuthController.register_post)
router.post('/login', AuthController.login_post)
router.post('/register_with_login', AuthController.register_with_google_post)
router.post('/login_with_login', AuthController.login_with_google_post)
router.post('/register_with_facebook', AuthController.register_with_facebook_post)
router.post('/login_with_facebook', AuthController.login_with_facebook_post)
router.get('/admin_check', validateToken, AuthController.check_admin)
router.get('/get_admin', validateToken, AuthController.get_admin)
router.get('/get_user', validateToken, AuthController.get_user)
router.put('/edit_admin', validateToken, AuthController.edit_admin)
router.put('/edit_user', validateToken, AuthController.edit_user)
router.put('/user/edit_pass', validateToken, AuthController.edit_user_pass)
router.delete('/delete_admin', validateToken, AuthController.delete_admin)
router.delete('/delete_user', validateToken, AuthController.delete_user)
router.post('/add_admin', validateToken, AuthController.add_admin)
router.delete('/delete', validateToken, AuthController.delete_user)
module.exports = router
