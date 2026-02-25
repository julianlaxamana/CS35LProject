const db = require('../config/database.js')

// adds or modifies a rating/review/favorite for a given user, dining hall, and food item
exports.modifyRating = async (req, res) => {
    try {
        const ratingsRef = await db.collection('dining_halls').doc(req.body.diningHallID).collection('Menu').doc(req.body.foodID).collection('ratings').doc(req.userID);
        const ratingsSnapshot = await ratingsRef.get();

        updateData = {};
        if (req.body.rating !== undefined) updateData.rating = req.body.rating;
        if (req.body.review !== undefined) updateData.review = req.body.review;
        if(req.body.marked_fav !== undefined) updateData.marked_fav = req.body.marked_fav;
        if (Object.keys(updateData).length === 0) {
            res.send("No fields to update");
            return;
        }

        if (ratingsSnapshot.exists) {
            ratingsRef.update(updateData);
            res.send("Rating/review updated successfully");
        } else {
            ratingsRef.set(updateData);
            res.send("Rating/review added successfully");
        }
    } catch (error){
        res.send(error);
    }
}

// TODO: add function to remove rating

exports.remove