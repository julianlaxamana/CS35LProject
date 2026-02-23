import { useState, useRef, useEffect } from 'react';
import SearchBar from '../molecules/SearchBar';
import Slider from '../atoms/Slider';

const Search = ({ is_open, on_close, day_data, current_venue_data, on_interact }) => {
  const [sort_mode, setSortMode] = useState("Alphabetical");
  const [tags, setTags] = useState([
    { name: "Alcohol", regex: "alcohol", is_selected: true },
    { name: "Shellfish", regex: "crustacean|shellfish", is_selected: true },
    { name: "Customizable", regex: "custom(izable)?", is_selected: true },
    { name: "Dairy", regex: "dairy", is_selected: true },
    { name: "Egg", regex: "egg(s)?", is_selected: true },
    { name: "Fish", regex: "fish", is_selected: true },
    { name: "Gluten", regex: "gluten", is_selected: true },
    { name: "Halal", regex: "halal", is_selected: true },
    { name: "High Carbon", regex: "high[- ]*carbon", is_selected: true },
    { name: "Low Carbon", regex: "low[- ]*carbon", is_selected: true },
    { name: "Peanut", regex: "peanut", is_selected: true },
    { name: "Sesame", regex: "sesame", is_selected: true },
    { name: "Soy", regex: "soy", is_selected: true },
    { name: "Tree Nut", regex: "tree[- ]*nut(s)?", is_selected: true },
    { name: "Vegan", regex: "vegan", is_selected: true },
    { name: "Vegetarian", regex: "vegetarian", is_selected: true },
    { name: "Wheat", regex: "wheat", is_selected: true },
  ]);

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

        <div className="search-filter-section">
          <h4>Filter by</h4>
          <div className="search-filter-content">
            <h5>Tags</h5>
            <FilterTags 
              tags={tags} 
              on_toggle_tag={(tag_name) => {
                const new_tags = tags.map((tag) => 
                  tag.name === tag_name ? { ...tag, is_selected: !tag.is_selected } : tag
                );
                setTags(new_tags);
                on_interact(new_tags);
              }}
            />

            <h5>Rating Range</h5>
            <Slider 
              min={0} 
              max={5}
              step={0.1}
              default_value_first={0}
              default_value_second={5}
              on_change={(first, second) => {
                const new_range = [first, second];
                on_interact(new_range);
              }}
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