import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Debugger = ({ 
  isVisible,
  current_day,
  is_open,
  meal_period,
  setCurrentDay,
  setIsOpen,
  setMealTime
}) => {
  if (!isVisible) return null;

  return (
    <div className="debugger-wrapper">
      <div className="debugger-header">Debugger</div>
      <div className="debugger-category-header">Navigation</div>
      <DebuggerNavigator />
      <div className="debugger-category-header">Time State</div>
      <DebuggerDaySelect current_day={current_day} setCurrentDay={setCurrentDay} />
      <DebuggerMealTimeSelect meal_period={meal_period} setMealTime={setMealTime} />
      <DebuggerOpenToggle is_open={is_open} setIsOpen={setIsOpen} />
    </div>
  );
}

// Toggle between view, edit, and add modes for the user page, useful for testing different user interactions and states.
const DebuggerDaySelect = ({ current_day, setCurrentDay }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <>
      <label htmlFor="day-select">Day of the Week</label>
      <select id="day-select" value={current_day} onChange={(e) => setCurrentDay(e.target.value)}>
        {days.map((day) => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
    </>
  );
}

const DebuggerMealTimeSelect = ({ meal_period, setMealTime }) => {
  const meal_periods = ['Breakfast', 'Lunch', 'Dinner', 'Extended Dinner'];
  
  return (
    <>
      <label htmlFor="meal-time-select">Meal Time</label>
      <select id="meal-time-select" value={meal_period} onChange={(e) => setMealTime(e.target.value)}>
        {meal_periods.map((meal) => (
          <option key={meal} value={meal}>{meal}</option>
        ))}
      </select>
    </>
  );
}

const DebuggerOpenToggle = ({ is_open, setIsOpen }) => {
  return (
    <div className="debugger-toggle">
      <button onClick={() => setIsOpen(!is_open)} className="debugger-button">
        {is_open ? 'Open Venue' : 'Close Venue'}
      </button>
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