import FillBar from "../atoms/FillBar";
import Icon from '../atoms/Icon';

import UCLADiningIcon from "../atoms/UCLADiningIcon";

import ItemDetails from "../../assets/item-details.svg";
import { SAMPLE_ITEM_DATA } from "../../SAMPLEDATA"

// This component represents a single menu item in the dashboard.
const DashboardItem = ({ item_data }) => {
  return (
    <ItemCard title={item_data.name} tags={item_data.tags} rating={item_data.rating} image={item_data.image} />
  );
}

// The card that shows basic info about the item, appears as part of a list in the dashboard.
const ItemCard = ({ title, tags, rating, image }) => {
  return (
    <div className="item-card">
      <div className="item-card-content">
        <div className="item-card-top-region">
          <FillBar text={`${rating.toFixed(2)}`} progress={(rating / 5) * 100} color="#9FDA97" grow_from="end" orientation="vertical" long_side_length={24} />
          <h4>{title}</h4>
        </div>
        <div className="item-card-bottom-region">
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

// Pops up when you click on an item card, shows more details about the item.
const ItemExpanded = ({ item_data }) => {
  return
}

export default DashboardItem;