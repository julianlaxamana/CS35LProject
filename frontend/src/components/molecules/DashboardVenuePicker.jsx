const VenuePicker = ({ venues_data, favorite_venues_data }) => {
  return (
    venues_data.map((venue) => (
      <VenueItem 
        key={venue.id}
        venue_item_data={{
          name: venue.name,
          is_favorite: favorite_venues_data.includes(venue.id),
        }}
       />
     ))
  );
}

const VenueItem = ({ venue_item_data }) => {
  return (
    <div className={`venue-item ${venue_item_data.is_favorite ? "favorite" : ""}`}>
      <h4>{venue_item_data.name}</h4>
    </div>
  );
}

export default VenuePicker;