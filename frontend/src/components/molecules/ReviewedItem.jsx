import FillBar from "../atoms/FillBar";

import PlaceholderThumbnail from "../../assets/placeholder-thumbnail.jpg";

// This component represents a single menu item in the user's reviews.
const ReviewedItem = ({ user_item_data, on_click }) => {
  return (
    <ItemCard 
      title={user_item_data.name} 
      rating={user_item_data.rating} 
      image={user_item_data.image || PlaceholderThumbnail} 
      review={user_item_data.review}
      on_click={on_click}
    />
  );
}

// The card that shows basic info about the item, appears as part of a list in the user's reviews.
const ItemCard = ({ title, rating, image, review, on_click }) => {
  return (
    <div className="item-card" onClick={on_click} style={{ cursor: on_click ? 'pointer' : 'default', backgroundColor: '#EDECFA', border: 'solid 1px #e0e0e0' }}>
      <div className="item-card-content">
        <div className="item-card-bottom-region" onClick={on_click}>
          <div className="user-item-review">
            {review ? `"${review}"` : "No review provided."}
          </div>
        </div>
        <div className="item-card-top-region">
          <FillBar text={rating ? `${rating.toFixed(2)}` : "N/A"} progress={rating ? (rating / 5) * 100 : 0} color="#9FDA97" grow_from="end" orientation="vertical" long_side_length={24} />
          <h4>{title}</h4>
        </div>
      </div>
      {/* <img src={image} alt={"[Image Here]"} className="item-card-image-small" /> */}
    </div>  
  );
}

export default ReviewedItem;