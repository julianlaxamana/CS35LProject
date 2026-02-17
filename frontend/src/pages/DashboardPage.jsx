import Header from '../components/molecules/DashboardHeader';
import Content from '../components/molecules/DashboardContent';

function DashboardPage() {
  // Sample data as constants for now, will be fetched from backend later
  const SAMPLE_HEADER_DATA = {
    venue_name: "Bruin Plate",
    day: "Thursday",
    is_open: true,
    meal_period: "Lunch",
    aggregate_rating: 2.53,
    occupancy: "75%"
  };

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
      <Header data={SAMPLE_HEADER_DATA} colors={COLORS} />
      <Content />
    </div>
  );
}

export default DashboardPage;
