import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Debugger = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="debugger-wrapper">
      <div className="debugger-header">Debugger</div>
      <div className="debugger-category-header">Navigation</div>
      <DebuggerNavigator />
      <div className="debugger-category-header">Time State</div>
      <DebuggerDaySelect />
      <DebuggerMealTimeSelect />
    </div>
  );
}

// Toggle between view, edit, and add modes for the user page, useful for testing different user interactions and states.
const DebuggerDaySelect = () => {
  const [selected_day, setDay] = useState('Monday');

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // TODO: change to dropdown

  return (
    <>
      <label htmlFor="day-select">Day of the Week</label>
      <select id="day-select" value={selected_day} onChange={(e) => setDay(e.target.value)}>
        {days.map((day) => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
    </>
  );
}

const DebuggerMealTimeSelect = () => {
  const [selected_meal_time, setMealTime] = useState('Lunch');

  const meal_time = ['Breakfast', 'Lunch', 'Dinner', 'Extended Dinner'];

  // TODO: change to dropdown
  
  return (
    <>
      <label htmlFor="meal-time-select">Meal Time</label>
      <select id="meal-time-select" value={selected_meal_time} onChange={(e) => setMealTime(e.target.value)}>
        {meal_time.map((meal) => (
          <option key={meal} value={meal}>{meal}</option>
        ))}
      </select>
    </>
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