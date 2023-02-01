const express = require('express');
const router = express.Router();
const AuthController = require('../autocontrollers/Auth')
const {validateToken} =require('../middleware/auth')

router.post('/register', AuthController.register_post)
router.post('/login', AuthController.login_post)
router.post('/register_with_login', AuthController.register_with_google_post )
router.post('/login_with_login', AuthController.login_with_google_post )
router.post('/register_with_facebook', AuthController.register_with_facebook_post)
router.post('/login_with_facebook', AuthController.login_with_facebook_post)
router.get('/admin_check',validateToken, AuthController.check_admin)
router.post('/add_admin',AuthController.add_admin)
router.delete('/delete',validateToken, AuthController.delete_user)
module.exports = router;
