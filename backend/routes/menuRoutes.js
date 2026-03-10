const express = require('express')
const router = express.Router()
const controller = require('../controllers/menuController.js')

router.get('/get_menu', controller.getMenu);

module.exports = router;