import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Verify current password by attempting login
      const res = await fetch('http://localhost:5000/api/auth/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userID: user.userID, password: currentPassword }),
      });

      const isValid = await res.json();
      if (isValid !== true) {
        setError('Current password is incorrect.');
        return;
      }

      setMessage('Password verified successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="settings-back-button" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <h1>Settings</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Account</h2>
          <div className="settings-info">
            <span className="settings-label">Username</span>
            <span className="settings-value">{user?.userID}</span>
          </div>
        </div>

        <div className="settings-section">
          <h2>Change Password</h2>
          <form className="settings-form" onSubmit={handleChangePassword}>
            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}

            <div className="auth-field">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                disabled={isSubmitting}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                disabled={isSubmitting}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        <div className="settings-section">
          <button className="settings-logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
