import IconVenueDetails from '../assets/venue-details.svg';

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

// Components to use, move out as separate files when we have more content in them.

const Header = ({ data, colors }) => {
  return (
    <div className="dashboard-header">
      <div className="dashboard-header-left-half">
        <h1>{data.venue_name}</h1>
        <h2>{data.day}</h2>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Chip label={data.is_open ? "Open" : "Closed"} size="small" bgcolor={data.is_open ? colors.open : colors.dark} color={colors.light} />
          {data.is_open && <Chip label={data.meal_period} size="small" bgcolor={colors.dark} color={colors.light} />}
        </div>
      </div>
      <div className="dashboard-header-right-half">
        <Icon src={IconVenueDetails} alt="Venue Details" color={colors.dark} />
        <AggregateRatingDisplay rating={data.aggregate_rating} />
        <OccupancyDisplay occupancy={data.occupancy} />
      </div>
    </div>
  );
}

const Content = () => {
  return (
    <div className="dashboard-content">
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." className="search-input" />
    </div>
  );
}

const AggregateRatingDisplay = ({ rating }) => {
  return (
    <div className="aggregate-display">
      <span className="rating-value">{rating.toFixed(2)}</span>
      <span className="rating-stars">{'★'.repeat(Math.round(rating))}</span>
    </div>
  );
}
const OccupancyDisplay = ({ occupancy }) => {
  return (
    <div className="occupancy-display">
      <span className="occupancy-value">{occupancy}</span>
    </div>
  );
}
const FillBar = ({ progress, color }) => {
  return (
    <div className="fill-bar" style={{ backgroundColor: color, width: `${progress}%` }}></div>
  );
}

const Chip = ({ label, size, bgcolor, color }) => {
  return (
    <span className={`chip-${size}`} style={{ backgroundColor: bgcolor, color: color }}>
      {label}
    </span>
  );
}
const Icon = ({ src, alt, color, size = 32 }) => {
  return (
    <img src={src} alt={alt} width={size} height={size} />
  );
}

export default DashboardPage;
