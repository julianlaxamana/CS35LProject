import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function UserPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="user-page">
      <div className="user-header">
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
          <p className="user-placeholder">Your favorite items will appear here.</p>
        </div>

        <div className="user-section">
          <h3>My Reviews</h3>
          <p className="user-placeholder">Your reviews will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
