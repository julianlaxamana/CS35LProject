const express = require('express')
const controller = require('../controllers/authController.js')
const {authMiddleware} = require('../middleware/authMiddleware.js');

const router = express.Router()

// create user
router.post('/create', controller.createUser);

// authenticate user
router.post('/auth', controller.authenticateUser);

// change password
router.patch('/change_password', authMiddleware, controller.changePassword);

module.exports = router;
