const express = require('express')
const router = express.Router()
const controller = require('../controllers/ratingController.js')
const {authMiddleware} = require('../middleware/authMiddleware.js');

router.post('/get_reviews', controller.getReviews);

router.use(authMiddleware);
router.post('/add_review', controller.modifyRating);
router.patch('/toggle_favorite', controller.toggleFavorite);
router.get('/get_user_reviews', controller.getUserReviews);
router.get('/get_user_ratings', controller.getUserRatings);
router.get('/get_user_favorites', controller.getUserFavorites);
router.delete('/remove_review', controller.removeReview);
router.delete('/delete_user', controller.deleteAllUserRatings);

module.exports = router;
