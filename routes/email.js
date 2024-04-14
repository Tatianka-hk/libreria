const express = require('express');
const router = express.Router();
const AuthController = require('../autocontrollers/Email');
router.post('/send', AuthController.send_email);
module.exports = router;