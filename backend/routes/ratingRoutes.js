const express = require('express')
const router = express.Router()
const controller = require('../controllers/ratingController')
const {authMiddleware} = require('../middleware/authMiddleware.js')

//router.use(authMiddleware);
// add review
router.post('/add_review', authMiddleware, controller.addReview);

module.exports = router;