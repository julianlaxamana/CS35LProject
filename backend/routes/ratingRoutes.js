const express = require('express')
const router = express.Router()
const controller = require('../controllers/ratingController.js')
const {authMiddleware} = require('../middleware/authMiddleware.js');

router.post('/add_review', authMiddleware, controller.modifyRating);

module.exports = router;