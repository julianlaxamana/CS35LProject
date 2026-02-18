import Chip from '../atoms/Chip';

import Favorite from '../../assets/favorite.svg';
import NotFavorite from '../../assets/not-favorite.svg';

const CurrentVenueDetails = ({ day_data, venue_data, is_favorited }) => {
  const hours_for_the_day = venue_data.hours[day_data.day.toLowerCase()];

  return (
    <div className="current-venue-details">
      <MarkAsFavoriteButton is_favorite={is_favorited} onClick={() => alert("Favorite functionality coming soon!")} />

      <div className="location-and-phone">
        <div>{venue_data.location}</div>
        <div>{venue_data.phone}</div>
      </div>

      <div className="notices">
        <h4>Notices</h4>
        {venue_data.notices.map((notice, index) => (
          <div key={index}>{notice}</div>
        ))}
      </div>
      
      <div className="statuses">
        <h4>Status</h4>
        <table>
          <tbody>
            <tr>
              <td>Availability</td>
              <td><Chip label={venue_data.status} size="small" bgcolor={venue_data.status === "Open" ? "#008B53" : "#505E82"} color="#E0E0E0" /></td>
            </tr>
            <tr>
              <td>Meal Period</td>
              <td>{venue_data.status === "Open" ? <Chip label={day_data.meal_period} size="small" bgcolor="#505E82" color="#E0E0E0" /> : "N/A"}</td>
            </tr>
            <tr>
              <td>Aggregate Rating</td>
              <td style={{ color:"#60BF3E", fontWeight: "bold" }}>{venue_data.aggregate_rating ? venue_data.aggregate_rating.toFixed(2) : "N/A"}</td>
            </tr>
            <tr>
              <td>Occupancy</td>
              <td style={{ color:"#E55B5B", fontWeight: "bold" }}>{venue_data.occupancy ? `${venue_data.occupancy}%` : "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="service-hours">
        <h4>Service Hours ({day_data.day})</h4>
        <table>
          <tbody>
            <tr>
              <td>Breakfast</td>
              <td>{hours_for_the_day.breakfast}</td>
            </tr>
            <tr>
              <td>Lunch</td>
              <td>{hours_for_the_day.lunch}</td>
            </tr>
            <tr>
              <td>Dinner</td>
              <td>{hours_for_the_day.dinner}</td>
            </tr>
            <tr>
              <td>Extended Dinner</td>
              <td>{hours_for_the_day.extended_dinner}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="about">
        <h4>About</h4>
        <div>{venue_data.about}</div>
      </div>
    </div>
  );
}

const MarkAsFavoriteButton = ({ is_favorite, onClick }) => {
  return (
    <button className={`favorite-button ${is_favorite ? "favorited" : ""}`} onClick={onClick}>
      <img src={is_favorite ? Favorite : NotFavorite} alt={is_favorite ? "Unfavorite" : "Mark as Favorite"} />
      <div>{is_favorite ? "Favorited" : "Mark as Favorite"}</div>
    </button>
  );
}

export default CurrentVenueDetails;