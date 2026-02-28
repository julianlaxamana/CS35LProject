import { useState } from 'react';
import Search from '../components/organisms/DashboardSearch';
import Header from '../components/organisms/DashboardHeader';
import Content from '../components/organisms/DashboardContent';
import VenueDetails from '../components/organisms/DashboardVenueDetails';
import ItemDetails from '../components/organisms/DashboardItemDetails';

import { SAMPLE_DASHBOARD_DAY_DATA, SAMPLE_DINING_VENUES, SAMPLE_USER_FAVORITE_DINING_VENUES, EMPTY_ITEM_DATA } from '../SAMPLEDATA';

function DashboardPage() {
  // State for opening and closing the search, venue details, and item details drawers.
  const [is_search_open, setIsSearchOpen] = useState(false);
  const [is_venuedetails_open, setIsVenueDetailsOpen] = useState(false);
  const [is_itemdetails_open, setIsItemDetailsOpen] = useState(false);

  // TODO: Hook up search bar state to this and pass down to search component, then use it to filter/sort items in content. 
  // Will need to decide on a format for the search/sort/filter instructions and how to store that in state.
  const [list_instructions, setSortMode] = useState({
    search_string: "",
    sort_mode: "Alphabetical",
    tags: [],
    rating_range: {min: 0, max: 5},
  });

  // State for currently selected venue and menu item, which will determine the content shown in the details drawers.
  const [selected_item, setSelectedItem] = useState(EMPTY_ITEM_DATA);

  const [current_venue_data, setCurrentVenueData] = useState(SAMPLE_DINING_VENUES[0]); 

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
        on_interact={() => {}}
      />
      <Header 
        day_data={SAMPLE_DASHBOARD_DAY_DATA}
        current_venue_data={current_venue_data} 
        colors={COLORS} 
        on_venue_details_click={() => setIsVenueDetailsOpen(true)} 
      />
      <Content 
        on_searchbar_click={() => setIsSearchOpen(true)} 
        on_item_click={(item) => {
          setSelectedItem(item);
          setIsItemDetailsOpen(true);
        }}
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
        on_interact={() => {}} 
      />
    </div>
  );
}

export default DashboardPage;
