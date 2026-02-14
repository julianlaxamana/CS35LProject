import { useState } from 'react';
import { Link } from 'react-router-dom';

const Debugger = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="debugger-wrapper">
      <div className="debugger-header">Debugger</div>
      <div className="debugger-category-header">Navigation</div>
      <DebuggerNavigator />
      <div className="debugger-category-header">User State</div>
      <DebuggerUserMode />
    </div>
  );
}

// Toggle between view, edit, and add modes for the user page, useful for testing different user interactions and states.
const DebuggerUserMode = () => {
  const [user_mode, setUserMode] = useState('view');

  const mode_keys = ['view', 'edit', 'add'];
  
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {mode_keys.map((mode) => (
        <button
          key={mode}
          onClick={() => setUserMode(mode)}
          style={mode === user_mode ? { backgroundColor: 'white', color: 'black' } : {}}
        >{mode}</button>
      ))}
    </div>
  );
}

// A simple navigation component for quickly accessing different pages in the app, use while we don't have the main navigation set up.
const DebuggerNavigator = () => {
  return (
    <>
      {/* Main screens */}
      <DebuggerNavLink href="/" pageName="Register" />
      <DebuggerNavLink href="/login" pageName="Login" />
      <DebuggerNavLink href="/dashboard" pageName="Dashboard" />
      <DebuggerNavLink href="/user" pageName="User" />
      <DebuggerNavLink href="/settings" pageName="Settings" />
    </>
  )
}
const DebuggerNavLink = ({ href, pageName }) => {
  return (
    <Link to={href} className="debugger-link">{pageName}</Link>
  );
}

export default Debugger;