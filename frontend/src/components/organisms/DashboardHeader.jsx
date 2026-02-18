import Chip from '../atoms/Chip';
import Icon from '../atoms/Icon';
import FillBar from '../atoms/FillBar';

import IconVenueDetails from '../../assets/venue-details.svg';

const Header = ({ header_data, current_venue_data, colors, on_venue_details_click }) => {
  return (
    <div className="dashboard-header">
      <div className="dashboard-header-left-half">
        <h1>{current_venue_data.name}</h1>
        <h2>{header_data.day}</h2>
        <div className="dashboard-chips">
          <Chip label={current_venue_data.status === "Open" ? "Open" : "Closed"} size="small" bgcolor={current_venue_data.status === "Open" ? colors.open : colors.dark} color={colors.light} />
          {current_venue_data.status === "Open" && <Chip label={header_data.meal_period} size="small" bgcolor={colors.dark} color={colors.light} />}
        </div>
      </div>
      <div className="dashboard-header-right-half" >
        <Icon src={IconVenueDetails} alt="Venue Details" color={colors.dark} onClick={on_venue_details_click} style={{ cursor: 'pointer' }} />
        <div className="venue-data">
          <AggregateRatingDisplay rating={current_venue_data.aggregate_rating} />
          <OccupancyDisplay occupancy={current_venue_data.occupancy} />
        </div>
      </div>
    </div>
  );
}

const AggregateRatingDisplay = ({ rating }) => {
  const as_progress = rating ? (rating / 5) * 100 : 0;
  return (
    <div className="aggregate-display">
      <div>Rating Today</div>
      <FillBar text={rating ? `${rating.toFixed(2)}` : "N/A"} progress={as_progress} color="#9FDA97" grow_from="end" />
    </div>
  );
}
const OccupancyDisplay = ({ occupancy }) => {
  const as_progress = occupancy ? parseFloat(occupancy) : 0;
  return (
    <div className="occupancy-display">
      <div>Occupancy</div>
      <FillBar text={occupancy ? `${occupancy}%` : "N/A"} progress={as_progress} color="#F68E8E" grow_from="end" />
    </div>
  );
}

export default Header;