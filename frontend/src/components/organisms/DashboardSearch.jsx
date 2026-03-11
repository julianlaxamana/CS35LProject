import { useState, useRef, useEffect } from 'react';
import SearchBar from '../molecules/SearchBar';
import Slider from '../atoms/Slider';

const Search = ({ is_open, on_close, day_data, current_venue_data, list_instructions, setListInstructions }) => {
  const handleSearchChange = (e) => {
    setListInstructions(prev => ({ ...prev, search_string: e.target.value }));
  };
  const handleSortChange = (new_value) => {
    setListInstructions(prev => ({ ...prev, sort_mode: new_value }));
  };
  const handleTagToggle = (tag_name) => {
    setListInstructions(prev => ({
      ...prev,
      tags: prev.tags.map(t => 
        t.name === tag_name ? { ...t, is_selected: !t.is_selected } : t
      )
    }));
  };
  const handleRatingChange = (first, second) => {
    setListInstructions(prev => ({ ...prev, rating_range: [first, second] }));
  };

  return (
    <div className={`drawer-overlay ${is_open ? "open" : ""}`} onClick={on_close}>
      <div className="search-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div onClick={on_close} style={{ cursor: "pointer" }}>
          <h3>Searching...</h3>
          <h2>{current_venue_data.name} ({day_data.day} {day_data.meal_period})</h2>
        </div>
        <SearchBar placeholder="Search menu items..." button_only={false} on_interact={handleSearchChange} />

        <div className="search-sort-section">
          <h4>Sort By</h4>
          <CustomDropdown 
            options={["Alphabetical", "Allergies", "Rating"]} 
            value={list_instructions.sort_mode}
            on_change={handleSortChange}
          />
        </div>

        <div className="search-filter-section">
          <h4>Filter by</h4>
          <div className="search-filter-content">
            <h5>Tags</h5>
            <FilterTags 
              tags={list_instructions.tags} 
              on_toggle_tag={handleTagToggle}
            />

            <h5>Rating Range</h5>
            <Slider 
              min={0} 
              max={5}
              step={0.1}
              default_value_first={list_instructions.rating_range[0]}
              default_value_second={list_instructions.rating_range[1]}
              on_change={handleRatingChange}
              has_two_thumbs={true}
            />
          </div>
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

const FilterTags = ({ tags, on_toggle_tag }) => {
  const ITEMS_PER_ROW = 3;

  return (
    <div className="filter-tags">
      <table>
        <tbody>
          {tags.map((tag, index) => (
            <tr key={tag.name} className="filter-tag-row">
              {tags.slice(index * ITEMS_PER_ROW, (index + 1) * ITEMS_PER_ROW).map((t) => (
                <td key={t.name}>
                  <FilterTagItem 
                    tag={t} 
                    is_selected={t.is_selected} 
                    on_toggle={() => on_toggle_tag(t.name)} 
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
const FilterTagItem = ({ tag, is_selected, on_toggle }) => {
  return (
    <div className={`filter-tag-item ${is_selected ? 'selected' : ''}`} onClick={on_toggle}>
      <div className="filter-tag-checkbox">
        <div className={`filter-tag-checkbox-inner ${is_selected ? 'filled' : ''}`}></div>
      </div>
      <span>{tag.name}</span>
    </div>
  );
}

export default Search;