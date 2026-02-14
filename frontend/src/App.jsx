import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Debugger from './components/Debugger';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Debugger isVisible={true} />
    </Router>
  );
}

export default App;
