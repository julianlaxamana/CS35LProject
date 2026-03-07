import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Debugger from './components/organisms/Debugger';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  const frame_scale = scaleToFit(390, 844); // Scale to fit iPhone 13/14 dimensions for demo

  return (
    <Router>
      <AuthProvider>
        <div className='app-frame' style={{ transform: `scale(${frame_scale})`, borderRadius: '16px', overflow: 'hidden' }}>
          <Routes>
            <Route element={<MobileLayout />}>
              <Route path="/" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
          <div id="modal-root"></div>
        </div>
        <Debugger isVisible={true} />
      </AuthProvider>
    </Router>
  );
}

const MobileLayout = ({}) => {
  return (
    <div className='mobile-layout'>
      <header className="mobile-header"></header>
      <main className="mobile-content">
        <Outlet />
      </main>
      <footer className="mobile-footer"></footer>
    </div>
  )
}

/**
 * A custom hook that calculates the appropriate scale factor to fit a given width and height
 * within the current window size, maintaining aspect ratio. Useful for scaling the app frame
 * to fit different screen sizes during development.
 *
 * Element must be styled with explicit px dimensions for accurate scaling.
 * @param {*} width The width of the frame to fit.
 * @param {*} height The height of the frame to fit.
 * @returns The scale factor to fit the frame within the window
 */
const scaleToFit = (width, height) => {
  const MARGIN = 32; // Margin around the frame so its not touching the edges of the window

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const scale_width = (window.innerWidth - MARGIN) / width;
      const scale_height = (window.innerHeight - MARGIN) / height;
      setScale(Math.min(scale_width, scale_height));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set the scale

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  return scale;
};

export default App;
