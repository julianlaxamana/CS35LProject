import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FavoritedItem from '../components/molecules/FavoritedItem';
import ReviewedItem from '../components/molecules/ReviewedItem';
import ItemDetails from '../components/organisms/DashboardItemDetails';

import { SAMPLE_ITEM_COLLECTION, EMPTY_ITEM_DATA, generateRandomUserItems } from '../SAMPLEDATA';

// Sample data generation, replace with actual API calls in production
const SAMPLE_USER_ITEMS = generateRandomUserItems(SAMPLE_ITEM_COLLECTION, 1);
const FAVORITE_ITEMS = SAMPLE_USER_ITEMS.filter(item => item.marked_as_favorite);
const REVIEWED_ITEMS = SAMPLE_USER_ITEMS.filter(item => item.review);

function UserPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [is_itemdetails_open, setIsItemDetailsOpen] = useState(false);
  const [selected_item, setSelectedItem] = useState(EMPTY_ITEM_DATA);

  const PAGE_SIZE = 5;
  const [current_page, setCurrentPage] = useState(1);
  const total_pages = Math.ceil(REVIEWED_ITEMS.length / PAGE_SIZE);
  const paginated_items = REVIEWED_ITEMS.slice((current_page - 1) * PAGE_SIZE, current_page * PAGE_SIZE);

  return (
    <div className="user-page">
      <div className="user-header">
        <button className="settings-back-button" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <h1>My Profile</h1>
        <button
          className="user-settings-button"
          onClick={() => navigate('/settings')}
        >
          Settings
        </button>
      </div>

      <div className="user-content">
        <div className="user-profile-section">
          <div className="user-avatar">
            {user?.userID?.charAt(0).toUpperCase()}
          </div>
          <h2 className="user-username">{user?.userID}</h2>
        </div>

        <div className="user-section">
          <h3>My Favorites</h3>
          {FAVORITE_ITEMS.map(user_item => (
            <FavoritedItem key={user_item.id} user_item_data={user_item} on_click={() => { setSelectedItem(user_item.item); setIsItemDetailsOpen(true); }} />
          ))}
        </div>

        <div className="user-section">
          <h3>My Reviews</h3>
          <Pagination
            current_page={current_page}
            total_pages={total_pages}
            on_page_change={(new_page) => setCurrentPage(new_page)}
          />
          {paginated_items.filter(user_item => user_item.review).map(user_item => (
            <ReviewedItem key={user_item.id} user_item_data={user_item} on_click={() => { setSelectedItem(user_item.item); setIsItemDetailsOpen(true); }} />
          ))}
        </div>
      </div>
      <ItemDetails 
        is_open={is_itemdetails_open} 
        on_close={() => setIsItemDetailsOpen(false)} 
        menu_item_data={selected_item} 
        on_interact={() => {}} 
      />
    </div>
  );
}

const Pagination = ({ current_page, total_pages, on_page_change }) => {
  return (
    <div className="reviews-pagination">
      <button onClick={() => on_page_change(1)} disabled={current_page === 1}>
        {"<<"}
      </button>
      <button onClick={() => on_page_change(current_page - 1)} disabled={current_page === 1}>
        {"<"}
      </button>
      <span>Page {current_page} of {total_pages}</span>
      <button onClick={() => on_page_change(current_page + 1)} disabled={current_page === total_pages}>
        {">"}
      </button>
      <button onClick={() => on_page_change(total_pages)} disabled={current_page === total_pages}>
        {">>"}
      </button>
    </div>
   );
}

export default UserPage;
