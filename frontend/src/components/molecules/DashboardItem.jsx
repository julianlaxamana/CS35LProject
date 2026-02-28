import FillBar from "../atoms/FillBar";
import Icon from '../atoms/Icon';

import UCLADiningIcon from "../atoms/UCLADiningIcon";

import ItemDetails from "../../assets/item-details.svg";
import PlaceholderThumbnail from "../../assets/placeholder-thumbnail.jpg";

// This component represents a single menu item in the dashboard.
const DashboardItem = ({ item_data, on_click }) => {
  return (
    <ItemCard 
      title={item_data.name} 
      tags={item_data.tags} 
      rating={item_data.rating} 
      image={item_data.image || PlaceholderThumbnail} 
      on_click={on_click}
    />
  );
}

// The card that shows basic info about the item, appears as part of a list in the dashboard.
const ItemCard = ({ title, tags, rating, image, on_click }) => {
  return (
    <div className="item-card">
      <div className="item-card-content">
        <div className="item-card-top-region">
          <FillBar text={`${rating.toFixed(2)}`} progress={(rating / 5) * 100} color="#9FDA97" grow_from="end" orientation="vertical" long_side_length={24} />
          <h4>{title}</h4>
        </div>
        <div className="item-card-bottom-region" onClick={on_click}>
          <Icon src={ItemDetails} alt="Venue Details" />
          <div className="item-card-tags">
            {tags.map((tag, index) => (
              <UCLADiningIcon key={index} tag={tag} />
            ))}
          </div>
        </div>
      </div>
      <img src={image} alt={"[Image Here]"} className="item-card-image" />
    </div>  
  );
}

export default DashboardItem;