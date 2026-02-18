import { useState } from 'react';
import Header from '../components/organisms/DashboardHeader';
import Content from '../components/organisms/DashboardContent';
import Drawer from '../components/organisms/DashboardDrawer';

import { SAMPLE_DASHBOARD_HEADER_DATA, SAMPLE_DINING_VENUES } from '../SAMPLEDATA';

function DashboardPage() {
  const [is_drawer_open, setIsDrawerOpen] = useState(false);

  // NOTE: Currently hardcoded to Bruin Plate for testing purposes. 
  // Default should be 0 when we have real data and can set it based on time of day.
  const [current_venue_data, setCurrentVenueData] = useState(SAMPLE_DINING_VENUES[3]); 

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
      <Header 
        header_data={SAMPLE_DASHBOARD_HEADER_DATA}
        current_venue_data={current_venue_data} 
        colors={COLORS} 
        on_venue_details_click={() => setIsDrawerOpen(true)} 
      />
      <Content />
      <Drawer 
        is_open={is_drawer_open} 
        on_close={() => setIsDrawerOpen(false)} 
        current_venue_data={current_venue_data}
        all_venues_data={SAMPLE_DINING_VENUES} 
      />
    </div>
  );
}

export default DashboardPage;
