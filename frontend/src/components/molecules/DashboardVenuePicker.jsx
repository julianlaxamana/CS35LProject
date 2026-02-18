const VenuePicker = ({ venues_data, favorite_venues_data, on_select_venue }) => {

  const sorted_venues = [...venues_data].sort((a, b) => {
    const a_is_favorite = favorite_venues_data.includes(a.id);
    const b_is_favorite = favorite_venues_data.includes(b.id);

    // favorites come first
    if (a_is_favorite && !b_is_favorite) return -1;  
    if (!a_is_favorite && b_is_favorite) return 1;

    // otherwise maintain original order
    return 0;
  });

  return (
    <div className="venue-picker">
      {sorted_venues.map((venue) => (
        <VenueItem 
          key={venue.id}
          venue_item_data={{
            ...venue,
            is_favorite: favorite_venues_data.includes(venue.id),
          }}
          onClick={() => on_select_venue(venue)}
        />
      ))}
    </div>
  );
}

const VenueItem = ({ venue_item_data, onClick }) => {
  return (
    <div className={`venue-item ${venue_item_data.is_favorite ? "favorite" : ""}`} onClick={onClick} style={{ cursor: "pointer" }} >
      <div className="venue-image-wrapper">
        <img 
          src={venue_item_data.image} 
          alt={`${venue_item_data.name} Thumbnail`} 
          className="venue-item-image" 
        />
      </div>

      <h4>{venue_item_data.name}</h4>

      {venue_item_data.status === "Open" ? (
        <div className="venue-item-data">
          <div style={{ color: "#60BF3E" }}>
            {venue_item_data.aggregate_rating !== null ? venue_item_data.aggregate_rating.toFixed(2) : "N/A"}
          </div>
          <div style={{ color: "#E55B5B" }}>
            {venue_item_data.occupancy !== null ? `${venue_item_data.occupancy}%` : "N/A"}
          </div>
        </div>
      ) : (
        <div className="venue-item-closed">Closed</div>
      )}
    </div>
  );
}

export default VenuePicker;