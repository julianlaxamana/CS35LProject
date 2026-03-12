import { useState, useEffect } from 'react';
import Search from '../components/organisms/DashboardSearch';
import Header from '../components/organisms/DashboardHeader';
import Content from '../components/organisms/DashboardContent';
import VenueDetails from '../components/organisms/DashboardVenueDetails';
import ItemDetails from '../components/organisms/DashboardItemDetails';

import { SAMPLE_DASHBOARD_DAY_DATA, SAMPLE_DINING_VENUES, SAMPLE_USER_FAVORITE_DINING_VENUES, EMPTY_ITEM_DATA } from '../SAMPLEDATA';

function DashboardPage({ current_day, is_open, meal_period }) {
  // State for opening and closing the search, venue details, and item details drawers.
  const [is_search_open, setIsSearchOpen] = useState(false);
  const [is_venuedetails_open, setIsVenueDetailsOpen] = useState(false);
  const [is_itemdetails_open, setIsItemDetailsOpen] = useState(false);
  const [update, setUpdate] = useState(0);

  const [list_instructions, setListInstructions] = useState({
    search_string: "",
    sort_mode: "Alphabetical",
    tags: [
      { name: "Alcohol", regex: "alcohol", is_selected: true },
      { name: "Shellfish", regex: "crustacean|shellfish", is_selected: true },
      { name: "Customizable", regex: "custom(izable)?", is_selected: true },
      { name: "Dairy", regex: "dairy", is_selected: true },
      { name: "Egg", regex: "egg(s)?", is_selected: true },
      { name: "Fish", regex: "fish", is_selected: true },
      { name: "Gluten", regex: "gluten", is_selected: true },
      { name: "Halal", regex: "halal", is_selected: true },
      { name: "High Carbon", regex: "high[- ]*carbon", is_selected: true },
      { name: "Low Carbon", regex: "low[- ]*carbon", is_selected: true },
      { name: "Peanut", regex: "peanut", is_selected: true },
      { name: "Sesame", regex: "sesame", is_selected: true },
      { name: "Soy", regex: "soy", is_selected: true },
      { name: "Tree Nut", regex: "tree[- ]*nut(s)?", is_selected: true },
      { name: "Vegan", regex: "vegan", is_selected: true },
      { name: "Vegetarian", regex: "vegetarian", is_selected: true },
      { name: "Wheat", regex: "wheat", is_selected: true },
    ],
    rating_range: [0, 5],
  });

  // State for currently selected venue and menu item, which will determine the content shown in the details drawers.
  const [selected_item, setSelectedItem] = useState(EMPTY_ITEM_DATA);

  const [current_venue_data, setCurrentVenueData] = useState(SAMPLE_DINING_VENUES[0]);
  const [venue_aggregate_rating, setVenueAggregateRating] = useState(null);

  // reset computed rating when switching venues
  useEffect(() => {
    setVenueAggregateRating(null);
  }, [current_venue_data]);

  // build venue data with live computed rating instead of hardcoded sample
  const header_venue_data = { ...current_venue_data, aggregate_rating: venue_aggregate_rating };

  // Define any colors or other constants to use in the component here for easy access and modification. Will relocate later.
  const COLORS = {
    light: "#E0E0E0",
    dark: "#505E82",
    open: "#008B53",
    // Use dark for closed
    aggregate_rating: "#9FDA97",
    occupancy: "#F68E8E",
    icon: "#83889C",
    border: "#9EA1B9",

  }

  return (
    <div className="dashboard-page">
      <Search 
        is_open={is_search_open} 
        on_close={() => setIsSearchOpen(false)} 
        day_data={SAMPLE_DASHBOARD_DAY_DATA}
        current_venue_data={current_venue_data}
        list_instructions={list_instructions}
        setListInstructions={setListInstructions}
      />
      <Header
        day_data={SAMPLE_DASHBOARD_DAY_DATA}
        current_venue_data={header_venue_data}
        colors={COLORS}
        on_venue_details_click={() => setIsVenueDetailsOpen(true)}
        current_day={current_day}
        meal_period={meal_period}
        is_open={is_open}
      />
      <Content
        on_searchbar_click={() => setIsSearchOpen(true)}
        on_item_click={(item) => {
          setSelectedItem(item);
          setIsItemDetailsOpen(true);
        }}
        venue={current_venue_data}
        list_instructions={list_instructions}
        current_day={current_day}
        meal_period={meal_period}
        is_open={is_open}
        update={update}
        on_ratings_loaded={setVenueAggregateRating}
      />
      <VenueDetails 
        is_open={is_venuedetails_open} 
        on_close={() => setIsVenueDetailsOpen(false)} 
        day_data={SAMPLE_DASHBOARD_DAY_DATA}
        current_venue_data={current_venue_data}
        all_venues_data={SAMPLE_DINING_VENUES} 
        favorite_venues_data={SAMPLE_USER_FAVORITE_DINING_VENUES}
        on_select_venue={(venue) => {
          setCurrentVenueData(venue);
          setIsVenueDetailsOpen(false);
        }}

      />
      <ItemDetails 
        is_open={is_itemdetails_open} 
        on_close={() => setIsItemDetailsOpen(false)} 
        menu_item_data={selected_item}
        dining_hall_id={current_venue_data.string_id} 
        on_interact={() => {}} 
        on_update={()=>{setUpdate(update + 1);}}
      />
    </div>
  );
}

export default DashboardPage;
