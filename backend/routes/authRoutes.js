const express = require('express')
const controller = require('../controllers/authController.js')

const router = express.Router()

// create user
router.post('/create', controller.createUser);

// authenticate user
router.post('/auth', controller.authenticateUser);

module.exports = router;