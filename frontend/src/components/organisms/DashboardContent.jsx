import SearchBar from "../molecules/SearchBar";
import DashboardItem from "../molecules/DashboardItem";
import Loading from '../atoms/Loading';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Content = ({ on_searchbar_click, on_item_click, venue, list_instructions, current_day, meal_period, is_open, update }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const handleFetch = async () => {
    setLoading(true);

    if (!is_open) {
      setItems([]);
      setLoading(false);
      return;
    }

    var venue_name = "";
    if (venue.name == "Bruin Plate"){
      venue_name = "bruin-plate";
    } else if (venue.name == "De Neve Dining"){
      venue_name = "de-neve-dining";
    } else if (venue.name == "Epicuria at Covel"){
      venue_name = "epicuria-at-covel";
    }

    const res = await fetch(`http://localhost:3000/api/menu/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ 
        diningHallID : venue_name, 
        day: current_day,
        time: meal_period,
      }),
    });

    var data = await res.json();
    if (!Array.isArray(data)) data = [];
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    console.log(update);
    handleFetch();
  }, [venue, current_day, meal_period, is_open, update]);


  const filteredAndSortedItems = items.filter(item => {
    // Search String Filter
    if (list_instructions.search_string && item.name) {
      if (!item.name.toLowerCase().includes(list_instructions.search_string.toLowerCase())) {
        return false;
      }
    }
    // Subtractive Tag Filter: If an item contains a tag that the user UNCHECKED, hide it.
    if (item.tags && list_instructions.tags) {
      const unselected_regex_strings = list_instructions.tags
        .filter(t => !t.is_selected)
        .map(t => new RegExp(t.regex, 'i'));
      
      const has_unselected_tag = item.tags.some(itemTag => 
        unselected_regex_strings.some(regex => regex.test(itemTag))
      );
      
      if (has_unselected_tag) return false;
    }
    // Rating Range Filter - let unrated items through
    const rating = item.rating;
    const [min_rating, max_rating] = list_instructions.rating_range;
    if (rating != null && !isNaN(rating)) {
      if (rating < min_rating || rating > max_rating) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    // favorited items go to the top
    const a_fav = a.user_favorites && user?.userID && a.user_favorites.includes(user.userID);
    const b_fav = b.user_favorites && user?.userID && b.user_favorites.includes(user.userID);
    if (a_fav && !b_fav) return -1;
    if (!a_fav && b_fav) return 1;

    // then sort by selected mode
    if (list_instructions.sort_mode === "Alphabetical") {
      return (a.name || "").localeCompare(b.name || "");
    } else if (list_instructions.sort_mode === "Rating") {
      return (b.rating || 0) - (a.rating || 0);
    } else if (list_instructions.sort_mode === "Allergies") {
      return (a.tags?.length || 0) - (b.tags?.length || 0);
    }
    return 0;
  });


  if (loading) return <Loading size={32} />;

  return (
    <div className="dashboard-content">
      <div style={{ position: "sticky", top: 0, zIndex: 15, paddingBottom: "16px" }}>
        <SearchBar placeholder="Narrow menu..." button_only={true} on_interact={on_searchbar_click} />
      </div>
      {filteredAndSortedItems.map((item, index) => (
        <DashboardItem
          key={item.id || index}
          item_data={item}
          on_click={() => on_item_click(item)}
          is_favorite={item.user_favorites && user?.userID && item.user_favorites.includes(user.userID)}
        />
      ))}
      {filteredAndSortedItems.length === 0 && (
        <p style={{ textAlign: "center", color: "#83889C" }}>No items match your search.</p>
      )}
    </div>
  );
}

export default Content;
