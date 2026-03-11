const express = require('express')
const router = express.Router()
const controller = require('../controllers/menuController.js')

router.post('/get_menu', controller.getMenu);
router.post('/query', controller.queryMenu);
router.patch('/average_rating', controller.getAverageRating);

module.exports = router;
