import { useState } from 'react';
import Search from '../components/organisms/DashboardSearch';
import Header from '../components/organisms/DashboardHeader';
import Content from '../components/organisms/DashboardContent';
import Drawer from '../components/organisms/DashboardDrawer';

import { SAMPLE_DASHBOARD_DAY_DATA, SAMPLE_DINING_VENUES, SAMPLE_USER_FAVORITE_DINING_VENUES } from '../SAMPLEDATA';

function DashboardPage() {
  const [is_drawer_open, setIsDrawerOpen] = useState(false);
  const [is_search_open, setIsSearchOpen] = useState(false);
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
        on_venue_details_click={() => setIsDrawerOpen(true)} 
      />
      <Content on_searchbar_click={() => setIsSearchOpen(true)} />
      <Drawer 
        is_open={is_drawer_open} 
        on_close={() => setIsDrawerOpen(false)} 
        day_data={SAMPLE_DASHBOARD_DAY_DATA}
        current_venue_data={current_venue_data}
        all_venues_data={SAMPLE_DINING_VENUES} 
        favorite_venues_data={SAMPLE_USER_FAVORITE_DINING_VENUES}
        on_select_venue={(venue) => {
          setCurrentVenueData(venue);
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
}

export default DashboardPage;
