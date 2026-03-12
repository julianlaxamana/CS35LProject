import { useState, useEffect } from 'react';
import Chip from '../atoms/Chip';
import Slider from '../atoms/Slider';
import UCLADiningIcon from "../atoms/UCLADiningIcon";
import MarkAsFavoriteButton from '../atoms/MarkAsFavoriteButton';
import Modal from '../atoms/Modal';
import NutritionFactsTable from '../molecules/NutritionFactsTable';
import IngredientsAndAllergensList from '../molecules/IngredientsAndAllergensList';

import { useAuth } from '../../contexts/AuthContext';
import ItemReviews from '../molecules/DashboardItemReviews';

import { EMPTY_ITEM_DATA } from '../../SAMPLEDATA';
// import PlaceholderThumbnail from "../../assets/placeholder-thumbnail.jpg";

const ItemDetails = ({ is_open, on_close, menu_item_data = EMPTY_ITEM_DATA, dining_hall_id, on_interact, on_update }) => {
  const [is_favorited, setFavorited] = useState(false);
  const { user } = useAuth();

  const checkFavorite = async () =>{
    const res = await fetch(`http://localhost:3000/api/ratings/get_user_favorites`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
  }
  useEffect(() => {
    if (menu_item_data != EMPTY_ITEM_DATA && menu_item_data.user_favorites != undefined){menu_item_data.user_favorites.includes(user.userID)}
  }, [menu_item_data]);

  const toggle_favorite = async (foodID, diningHallID) => {
    const res = await fetch(`http://localhost:3000/api/ratings/toggle_favorite`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ 
        foodID, diningHallID
      }),
    });
    setFavorited(!is_favorited);
  }
  return (
    <div className={`drawer-overlay ${is_open ? "open" : ""}`} onClick={on_close}>
      <div className="item-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* <img src={menu_item_data.image || PlaceholderThumbnail} alt={`[Image Here]`} className="item-drawer-image" /> */}
        <h2>{menu_item_data.name}</h2>
        <div className="item-drawer-tags">
          {menu_item_data.tags.map((tag, index) => (
            <UCLADiningIcon key={index} tag={tag} size={24} with_label={true} />
          ))}
        </div>
        <MarkAsFavoriteButton is_favorite={is_favorited} onClick={() => {toggle_favorite(menu_item_data.name, dining_hall_id)}} />
        <OverallRating on_submit={on_update} average_rating={menu_item_data.rating || null} on_update={() => {}} dining_hall_id={dining_hall_id} food_id={menu_item_data.name} />
        <Reviews reviews={menu_item_data.reviews || []} on_update={() => {}} on_submit={on_update} dining_hall_id={dining_hall_id} food_id={menu_item_data.name} />
        <NutritionFacts nutrition_facts={menu_item_data.nutrition_facts} />
        <IngredientsAndAllergens ingredients_and_allergens={menu_item_data.ingredients} />
      </div>
    </div>
  )
};

const OverallRating = ({ on_submit, average_rating, on_update, user_rating, dining_hall_id, food_id }) => {  
  const [is_modal_open, setIsModalOpen] = useState(false);
  const [slider_value, setSliderValue] = useState(user_rating);

  //const average_rating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : null;
  //const abbreviated_count = ratings.length > 999 ? `${(ratings.length / 1000).toFixed(1)}k` : ratings.length;

  const avg_rating = async (diningHallID, foodID) => {
    const res = await fetch(`http://localhost:3000/api/menu/average_rating`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({"foodID" : foodID, "diningHallID" : diningHallID}),
    });

    const data = await res.text();
    console.log(data)
    return true;
  }

  const updateUserRating = (new_rating) => {
    const updateRating = async (diningHallID, foodID, rating) => {
      const res = await fetch(`http://localhost:3000/api/ratings/add_review`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({diningHallID, foodID, rating}),
      });
    };
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
    updateRating(dining_hall_id, food_id, new_rating).then(val => {avg_rating(dining_hall_id, food_id).then(val => {on_submit();})});
    console.log(`New rating submitted: ${new_rating}`);
    on_update(new_rating);
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="overall-rating" onClick={() => setIsModalOpen(true)}>
        <h3>Overall Rating</h3>
        <div className="rating-value">{average_rating && !isNaN(average_rating) ? average_rating.toFixed(2) : "N/A"}</div>
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

const Reviews = ({ reviews, on_update, user_review, dining_hall_id, food_id, on_submit}) => {  
  const [is_modal_open, setIsModalOpen] = useState(false);
  const [review_text, setReviewText] = useState(user_review);

  const abbreviated_count = reviews.length > 999 ? `${(reviews.length / 1000).toFixed(1)}k` : reviews.length;

  return (
    <>
      <div className="reviews-section" onClick={() => setIsModalOpen(true)}>
        <h3>Reviews ({abbreviated_count})</h3>
      </div>
      <Modal is_open={is_modal_open} on_close={() => setIsModalOpen(false)}>
        <div className="reviews-modal-inner">
          <ItemReviews 
            reviews={reviews} 
            on_update={on_update} 
            user_review={user_review} 
            diningHallID={dining_hall_id}
            foodID={food_id}
            on_submit={on_submit}
          />
        </div>
      </Modal>
    </>
  );
}

const NutritionFacts = ({ nutrition_facts }) => {
  return (
    <div className="nutrition-facts">
      <h3>Nutrition Facts</h3>
      <NutritionFactsTable nutrition_facts={nutrition_facts} />
    </div>
  );
}

const IngredientsAndAllergens = ({ ingredients_and_allergens }) => {
  return (
    <div className="ingredients-and-allergens">
      <h3>Ingredients and Allergens</h3>
      <IngredientsAndAllergensList ingredients_and_allergens={ingredients_and_allergens} />
    </div>
  );
}

export default ItemDetails;
