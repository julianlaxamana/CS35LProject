import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="nav-tabs">
        <Link to="/" className="nav-link">Auth</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/user" className="nav-link">User</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
