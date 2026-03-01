const db = require('../config/database.js')
const admin = require('../config/database.js').admin

// adds or modifies a user's rating/review/favorite for a given dining hall, and food item
exports.modifyRating = async (req, res) => {
    try {
        const ratingID = `${req.body.diningHallID}-${req.body.foodID}-${req.userID}`;
        const ratingsRef = db.collection('ratings').doc(ratingID);
        const updateData = {};
        if (req.body.rating !== undefined) updateData.rating = req.body.rating;
        if (req.body.review !== undefined) updateData.review = req.body.review;
        if (Object.keys(updateData).length === 0) {
            res.send("No fields to update");
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

        res.send("Rating added/modified successfully");
    } catch (error){
        res.send(error);
    }
}

// marks or unmarks food as favorite
// if user does not have ratings/reviews or not marked as fav,
// new user rating with only marked property created
exports.toggleFavorite = async (req, res) => {
    try {
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
        
        res.send("Successfully toggled favorite");
    } catch (error) {
        res.send(error)
    }
}

// removes a user's review for a given dining hall, and food item (does not remove rating or favorite status)
exports.removeReview = async (req, res) => {
    try {
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
            res.send("Review removed successfully");
            return;
        }
        res.send("No review to remove");
    } catch (error) {
        res.send(error);
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

        res.send("All user ratings successfully deleted");
    } catch (error) {
        res.send(error);
    }
}