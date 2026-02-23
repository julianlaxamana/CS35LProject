import { useState, useEffect } from 'react';
import Chip from '../atoms/Chip';
import Slider from '../atoms/Slider';
import UCLADiningIcon from "../atoms/UCLADiningIcon";
import MarkAsFavoriteButton from '../atoms/MarkAsFavoriteButton';
import Modal from '../atoms/Modal';

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
        <OverallRating ratings={menu_item_data.ratings || []} on_update={() => {}} />
        <Reviews reviews={menu_item_data.reviews || []} on_click={() => alert("Review functionality coming soon!")} />
        <NutritionFacts nutrition_facts={menu_item_data.nutrition_facts || {}} />
        <IngredientsAndAllergens ingredients_and_allergens_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem vero excepturi dignissimos, eveniet culpa pariatur mollitia suscipit fuga modi explicabo impedit. Aspernatur dolor officiis doloremque, labore pariatur sit. Totam harum facere impedit fugit? Ab animi sint qui, quam, quaerat harum nulla non similique quae tenetur culpa rem ipsum id enim!" />
        
      </div>
    </div>
  )
};

const OverallRating = ({ ratings, on_update, user_rating }) => {  
  const [is_modal_open, setIsModalOpen] = useState(false);
  const [slider_value, setSliderValue] = useState(user_rating);

  const average_rating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : null;
  const abbreviated_count = ratings.length > 999 ? `${(ratings.length / 1000).toFixed(1)}k` : ratings.length;

  const updateUserRating = (new_rating) => {
    // Placeholder for updating user rating, will eventually involve API call and state update
    if (new_rating === null) {
      console.log("No rating submitted.");
      setIsModalOpen(false);
      return;
    }
    if (new_rating === user_rating) {
      console.log("Rating unchanged.");
      setIsModalOpen(false);
      return;
    }
    console.log(`New rating submitted: ${new_rating}`);
    on_update(new_rating);
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="overall-rating" onClick={() => setIsModalOpen(true)}>
        <h3>Overall Rating ({abbreviated_count})</h3>
        <div className="rating-value">{average_rating !== null ? average_rating.toFixed(2) : "N/A"}</div>
      </div>
      <Modal is_open={is_modal_open} on_close={() => setIsModalOpen(false)}>
        <div className="rating-modal-inner">
          <h4>Leave a Rating?</h4>
          <div className="rating-slider">
            <Slider 
              min={0} 
              max={5} 
              step={0.1} 
              default_value_first={user_rating || 0} 
              default_value_second={5} 
              on_change={(first, second) => setSliderValue(second)} 
              has_two_thumbs={false} 
            />
          </div>
          <div className="rating-guide">
            <span>Unsatisfactory</span>
            <span>Excellent</span>
          </div>
          <div className="rating-buttons">
            <Chip 
              label="Save" 
              size="medium" 
              bgcolor="#6B9E64" 
              color="#E0E0E0" 
              clickable={true}
              on_click={() => updateUserRating(slider_value)} 
            />
            <Chip 
              label="Cancel" 
              size="medium" 
              bgcolor="#9E6464" 
              color="#E0E0E0" 
              clickable={true}
              on_click={() => setIsModalOpen(false)} 
            />
          </div>
        </div>
      </Modal>
    </>
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