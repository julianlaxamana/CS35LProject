import Header from '../components/organisms/DashboardHeader';
import Content from '../components/organisms/DashboardContent';

import { SAMPLE_DASHBOARD_HEADER_DATA } from '../SAMPLEDATA';

function DashboardPage() {
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
    <div>
      <Header data={SAMPLE_DASHBOARD_HEADER_DATA} colors={COLORS} />
      <Content />
    </div>
  );
}

export default DashboardPage;
