const express = require('express')
const router = express.Router()
const controller = require('../controllers/ratingController.js')
const {authMiddleware} = require('../middleware/authMiddleware.js');

router.post('/add_review', authMiddleware, controller.modifyRating);
router.delete('/remove_review', authMiddleware, controller.removeReview);
router.patch('/toggle_favorite', authMiddleware, controller.toggleFavorite);


module.exports = router;