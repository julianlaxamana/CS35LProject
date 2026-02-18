import Chip from '../atoms/Chip';
import Icon from '../atoms/Icon';
import FillBar from '../atoms/FillBar';

import IconVenueDetails from '../../assets/venue-details.svg';

const Header = ({ data, colors }) => {
  return (
    <div className="dashboard-header">
      <div className="dashboard-header-left-half">
        <h1>{data.venue_name}</h1>
        <h2>{data.day}</h2>
        <div className="dashboard-chips">
          <Chip label={data.is_open ? "Open" : "Closed"} size="small" bgcolor={data.is_open ? colors.open : colors.dark} color={colors.light} />
          {data.is_open && <Chip label={data.meal_period} size="small" bgcolor={colors.dark} color={colors.light} />}
        </div>
      </div>
      <div className="dashboard-header-right-half">
        <Icon src={IconVenueDetails} alt="Venue Details" color={colors.dark} />
        <div className="venue-data">
          <AggregateRatingDisplay rating={data.aggregate_rating} />
          <OccupancyDisplay occupancy={data.occupancy} />
        </div>
      </div>
    </div>
  );
}

const AggregateRatingDisplay = ({ rating }) => {
  const as_progress = (rating / 5) * 100;
  return (
    <div className="aggregate-display">
      <div>Rating Today</div>
      <FillBar text={`${rating.toFixed(2)}`} progress={as_progress} color="#9FDA97" grow_from="end" />
    </div>
  );
}
const OccupancyDisplay = ({ occupancy }) => {
  const as_progress = parseFloat(occupancy);
  return (
    <div className="occupancy-display">
      <div>Occupancy</div>
      <FillBar text={`${occupancy}`} progress={as_progress} color="#F68E8E" grow_from="end" />
    </div>
  );
}

export default Header;