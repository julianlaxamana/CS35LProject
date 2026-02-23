import { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
          className={mode === user_mode ? 'debugger-button-selected debugger-button' : 'debugger-button'}
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
      <DebuggerNavLink href="/" page_name="Register" />
      <DebuggerNavLink href="/login" page_name="Login" />
      <DebuggerNavLink href="/dashboard" page_name="Dashboard" />
      <DebuggerNavLink href="/user" page_name="User" />
      <DebuggerNavLink href="/settings" page_name="Settings" />
    </>
  )
}
const DebuggerNavLink = ({ href, page_name }) => {
  return (
    <NavLink 
      to={href} 
      className={({ isActive }) => isActive ? 'debugger-link debugger-link-active' : 'debugger-link'}
    >{({ isActive }) => isActive ? `>${page_name}` : page_name}</NavLink>
  );
}

export default Debugger;