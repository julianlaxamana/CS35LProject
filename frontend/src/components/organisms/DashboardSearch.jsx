import { useState, useRef, useEffect } from 'react';
import SearchBar from '../molecules/SearchBar';

const Search = ({ is_open, on_close, day_data, current_venue_data, on_interact }) => {
  const [sort_mode, setSortMode] = useState("Alphabetical");

  return (
    <div className={`drawer-overlay ${is_open ? "open" : ""}`} onClick={on_close}>
      <div className="search-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div onClick={on_close} style={{ cursor: "pointer" }}>
          <h3>Searching...</h3>
          <h2>{current_venue_data.name} ({day_data.day} {day_data.meal_period})</h2>
        </div>
        <SearchBar placeholder="Search menu items..." button_only={false} on_interact={on_interact} />
        <div className="search-sort-section">
          <h4>Sort By</h4>
          <CustomDropdown 
            options={["Alphabetical", "Allergies", "Rating"]} 
            value={sort_mode}
            on_change={(new_value) => {
              setSortMode(new_value);
              on_interact(new_value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

const CustomDropdown = ({ options, value, on_change }) => {
  const [is_open, setIsOpen] = useState(false);
  const dropdown_ref = useRef(null);

  // Close the dropdown if the user clicks anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown_ref.current && !dropdown_ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    on_change(option);
    setIsOpen(false);
  };

  return (
    <div className="search-sort-selector" ref={dropdown_ref}>
      <div 
        className={`search-sort-header ${is_open ? 'focused' : ''}`} 
        onClick={() => setIsOpen(!is_open)}
      >
        <span>{value}</span>
      </div>
      {is_open && (
        <ul className="search-sort-dropdown">
          {options.map((option) => (
            <li 
              key={option} 
              className={`search-sort-dropdown-item ${option === value ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;