const VenueSwitcher = ({ venues_data }) => {
  return (
    <div className="venue-switcher">
      <h3>Switch Venue</h3>
      <p>Feature coming soon!</p>
    </div>
  );
}

const VenueItem = ({ venue_item_data }) => {
  return (
    <div className="venue-item">
      <h4>{venue_item_data.name}</h4>
      <p>{venue_item_data.status === "Open" ? "Open" : "Closed"}</p>
    </div>
  );
}

export default VenueSwitcher;