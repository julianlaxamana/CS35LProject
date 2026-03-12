import Chip from '../atoms/Chip';
import Icon from '../atoms/Icon';
import FillBar from '../atoms/FillBar';

import IconVenueDetails from '../../assets/venue-details.svg';

const Header = ({ day_data, current_venue_data, colors, on_venue_details_click, current_day, meal_period, is_open }) => {
  meal_period = meal_period == "Extended Dinner" ? "Late Night" : meal_period;

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-left-half">
        <h1>{current_venue_data.name}</h1>
        <h2>{current_day}</h2>
        <div className="dashboard-chips">
          <Chip label={is_open ? "Open" : "Closed"} size="medium" bgcolor={is_open ? colors.open : colors.dark} color={colors.light} />
          {is_open && <Chip label={meal_period} size="medium" bgcolor={colors.dark} color={colors.light} />}
        </div>
      </div>
      <div className="dashboard-header-right-half" >
        <Icon src={IconVenueDetails} alt="Venue Details" color={colors.dark} onClick={on_venue_details_click} style={{ cursor: 'pointer' }} />
        <div className="venue-data">
          <AggregateRatingDisplay rating={current_venue_data.aggregate_rating} />
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
