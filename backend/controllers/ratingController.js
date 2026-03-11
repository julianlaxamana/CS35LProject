const db = require('../config/database.js')
const admin = require('../config/database.js').admin

// adds or modifies a user's rating/review/favorite for a given dining hall, and food item
exports.modifyRating = async (req, res) => {
    try {
        if (!await validateFoodAndDH(res, req.body.diningHallID, req.body.foodID)) return;
        if (!validateRatingAndReview(res, req.body.rating, req.body.review)) return;
        
        const ratingID = `${req.body.diningHallID}-${req.body.foodID}-${req.userID}`;
        const ratingsRef = db.collection('ratings').doc(ratingID);
        const updateData = {};
        if (req.body.rating !== undefined) updateData.rating = req.body.rating;
        if (req.body.review !== undefined) updateData.review = req.body.review;
        if (Object.keys(updateData).length === 0) {
            res.status(400).send("No fields to update");
            return;
        }
        
        updateData.userID = req.userID;
        updateData.foodID = req.body.foodID;
        updateData.diningHallID = req.body.diningHallID;
        await db.runTransaction(async (transaction) => {
            const ratingsSnapshot = await transaction.get(ratingsRef);
            if (ratingsSnapshot.exists) {
                transaction.update(ratingsRef, updateData);
            } else {
                transaction.set(ratingsRef, updateData);
            }
        });

        res.status(200).send("Rating added/modified successfully");
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

// marks or unmarks food as favorite
// if user does not have ratings/reviews or not marked as fav,
// new user rating with only marked property created
exports.toggleFavorite = async (req, res) => {
    try {
        if (!await validateFoodAndDH(res, req.body.diningHallID, req.body.foodID)) return;
        const ratingsID = `${req.body.diningHallID}-${req.body.foodID}-${req.userID}`;
        const ratingsRef = db.collection('ratings').doc(ratingsID);
        
        const updateData = {};
        updateData.userID = req.userID;
        updateData.foodID = req.body.foodID;
        updateData.diningHallID = req.body.diningHallID;

        await db.runTransaction(async (transaction) => {
            const ratingsSnapshot = await transaction.get(ratingsRef);
            if (!ratingsSnapshot.exists) {
                updateData.marked_fav = true;
                transaction.set(ratingsRef, updateData);
            } else {
                const favState = ratingsSnapshot.get('marked_fav');
                if (favState === undefined) {
                    updateData.marked_fav = true;
                } else {
                    updateData.marked_fav = !favState;
                }
                transaction.update(ratingsRef, updateData);
            }
        });
        
        res.status(200).send("Successfully toggled favorite");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getReviews = async (req, res) => {
    try {
        if (!await validateFoodAndDH(res, req.body.diningHallID, req.body.foodID)) return;
        const foodID = `${req.body.foodID}`;
        const diningHallID = `${req.body.diningHallID}`;
        const reviewRef = db.collection('ratings').where('diningHallID', '==', diningHallID).where('foodID', '==', foodID);
        const reviewSnapshot = await reviewRef.get();

        if (reviewSnapshot.empty) {
            res.status(200).json({ reviews: [] });
            return;
        }

        const reviews = reviewSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                userID: data.userID,
                review: data.review,
                rating: data.rating
            }
        }).filter(entry => entry.review !== undefined);
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUserReviews = async (req, res) => {
    try {
        const reviewRef = db.collection('ratings').where('userID', '==', req.userID).where('review', '!=', null);
        const reviewSnapshot = await reviewRef.get();

        if (reviewSnapshot.empty) {
            res.status(200).json({ reviews: [] });
            return;
        }

        const reviews = reviewSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                foodID: data.foodID,
                diningHallID: data.diningHallID,
                review: data.review,
                rating: data.rating
            }
        });
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUserFavorites = async (req, res) => {
    try {
        const reviewRef = db.collection('ratings').where('userID', '==', req.userID).where('marked_fav', '==', true);
        const reviewSnapshot = await reviewRef.get();

        if (reviewSnapshot.empty) {
            res.status(200).json({ reviews: [] });
            return;
        }

        const reviews = reviewSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                foodID: data.foodID,
                diningHallID: data.diningHallID,
                rating: data.rating
            }
        });
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// removes a user's review for a given dining hall, and food item (does not remove rating or favorite status)
exports.removeReview = async (req, res) => {
    try {
        if (!await validateFoodAndDH(res, req.body.diningHallID, req.body.foodID)) return;
        const reviewID = `${req.body.diningHallID}-${req.body.foodID}-${req.userID}`;
        const reviewRef = db.collection('ratings').doc(reviewID);

        let hasReview = false;
        await db.runTransaction(async (transaction) => {
            const reviewSnapshot = await transaction.get(reviewRef);
            if(!reviewSnapshot.exists || await reviewSnapshot.get('review') === undefined) {
                return;
            }
            hasReview = true;
            transaction.update(reviewRef, { review: admin.firestore.FieldValue.delete() });
        });

        if (hasReview) {
            res.status(200).send("Review removed successfully");
            return;
        }
        res.status(404).send("No review to remove");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// removes all user ratings/reviews/favorites (if we have feature to remove user account)
exports.deleteAllUserRatings = async (req, res) => {
    try {
        const ratingsRef = db.collection('ratings').where('userID', '==', req.userID);

        await db.runTransaction(async (transaction) => {
            const ratingsSnapshot = await transaction.get(ratingsRef);
            if (ratingsSnapshot.empty) {
                return;
            }
            ratingsSnapshot.docs.forEach(doc => {
                transaction.delete(doc.ref);
            });
        });

        res.status(200).send("All user ratings successfully deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// HELPER FUNCTIONS
async function validateFoodAndDH(res, diningHallID, foodID) {
    if (!diningHallID || !foodID) {
        res.status(400).json({ message: "Need values for both diningHallID and foodID"});
        return false;
    } 
    const validDiningHall = await db.collection('dining_halls').doc(diningHallID).get();
    if (!validDiningHall.exists) {
        res.status(400).json({ message: "Invalid diningHallID" });
        return false;
    } 
    const validFoodID = await db.collection('dining_halls').doc(diningHallID).collection('Menu').doc(foodID).get();
    if (!validFoodID.exists) {
        res.status(400).json({ message: "Invalid foodID" });
        return false;
    }
    return true;
}

function validateRatingAndReview(res, rating, review) {
    if (rating !== undefined && (typeof rating !== 'number' || isNaN(rating) || rating < 1.0 || rating > 5.0)) {
        res.status(400).json({ message: "Rating must be a number between 1.0 and 5.0"});
        return false;
    }
    if (review !== undefined && (typeof review !== 'string' || review.trim().length === 0)) {
        res.status(400).json({ message: "Review must be a non empty string"});
        return false;
    }
    return true;
}