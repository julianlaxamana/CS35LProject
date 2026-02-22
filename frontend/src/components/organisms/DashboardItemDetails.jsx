import { useState, useEffect } from 'react';
import UCLADiningIcon from "../atoms/UCLADiningIcon";
import MarkAsFavoriteButton from '../atoms/MarkAsFavoriteButton';

import { EMPTY_ITEM_DATA } from '../../SAMPLEDATA';
import PlaceholderThumbnail from "../../assets/placeholder-thumbnail.jpg";

const ItemDetails = ({ is_open, on_close, menu_item_data = EMPTY_ITEM_DATA, on_interact }) => {
  const is_favorited = false; // Placeholder for favorite status, will be obtained from passed menu_item_data

  return (
    <div className={`drawer-overlay ${is_open ? "open" : ""}`} onClick={on_close}>
      <div className="item-drawer-content" onClick={(e) => e.stopPropagation()}>
        <img src={menu_item_data.image || PlaceholderThumbnail} alt={`[Image Here]`} className="item-drawer-image" />
        <h2>{menu_item_data.name}</h2>
        <div className="item-drawer-tags">
          {menu_item_data.tags.map((tag, index) => (
            <UCLADiningIcon key={index} tag={tag} size={24} with_label={true} />
          ))}
        </div>
        <MarkAsFavoriteButton is_favorite={is_favorited} onClick={() => alert("Favorite functionality coming soon!")} />
        <OverallRating ratings={menu_item_data.ratings || []} on_click={() => alert("Rating functionality coming soon!")} />
        <Reviews reviews={menu_item_data.reviews || []} on_click={() => alert("Review functionality coming soon!")} />
        <NutritionFacts nutrition_facts={menu_item_data.nutrition_facts || {}} />
        <IngredientsAndAllergens ingredients_and_allergens_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem vero excepturi dignissimos, eveniet culpa pariatur mollitia suscipit fuga modi explicabo impedit. Aspernatur dolor officiis doloremque, labore pariatur sit. Totam harum facere impedit fugit? Ab animi sint qui, quam, quaerat harum nulla non similique quae tenetur culpa rem ipsum id enim!" />
        
      </div>
    </div>
  )
};

const OverallRating = ({ ratings, on_click }) => {  
  
  // TODO: clicking this opens a slider to leave/update rating

  const average_rating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : null;
  const abbreviated_count = ratings.length > 999 ? `${(ratings.length / 1000).toFixed(1)}k` : ratings.length;

  return (
    <div className="overall-rating" onClick={on_click}>
      <h3>Overall Rating ({abbreviated_count})</h3>
      <div className="rating-value">{average_rating !== null ? average_rating.toFixed(2) : "N/A"}</div>
    </div>
  );
}

const Reviews = ({ reviews, on_click }) => {  
  
  // TODO: clicking this expands an area below with a portion of all reviews and the option to leave/update your own review

  return (
    <div className="reviews-section" onClick={on_click}>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <div>No reviews yet. Be the first to leave a review!</div>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-rating">Rating: {review.rating.toFixed(2)}</div>
            <div className="review-comment">{review.comment}</div>
          </div>
        ))
      )}
    </div>
  );
}

const NutritionFacts = ({ nutrition_facts }) => {
  return (
    <div className="nutrition-facts">
      <h3>Nutrition Facts</h3>
    </div>
  );
}

const IngredientsAndAllergens = ({ ingredients_and_allergens_text }) => {
  return (
    <div className="ingredients-and-allergens">
      <h3>Ingredients and Allergens</h3>
      <div className="ingredients-and-allergens-text">
        {ingredients_and_allergens_text}
      </div>
    </div>
  );
}

export default ItemDetails;