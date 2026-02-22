import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../atoms/Icon';

import VenuePicker from '../molecules/DashboardVenuePicker';
import CurrentVenueDetails from '../molecules/DashboardCurrentVenueDetails';

import YourAccount from '../../assets/your-account.svg';
import SelectVenue from '../../assets/select-venue.svg';
import CurrentVenue from '../../assets/current-venue.svg';

const Drawer = ({ is_open, on_close, day_data, current_venue_data, all_venues_data, favorite_venues_data, on_select_venue }) => {
  const navigate = useNavigate();

  const [reset_key, setResetKey] = useState(false);

  useEffect(() => {
    // Whenever the drawer is closed, toggle the reset key to force remounting of child components
    if (!is_open) {
      setResetKey(prev => !prev);
    }
  }, [is_open]);

  return (
    <div className={`drawer-overlay ${is_open ? "open" : ""}`} onClick={on_close}>
      <div key={reset_key} className="venue-drawer-content" onClick={(e) => e.stopPropagation()}>
        <DrawerSection 
          title="Your Account" 
          icon={YourAccount} 
          is_link={true} 
          on_header_click={() => {
            navigate('/user');
            on_close();
          }}
        />

        <DrawerSection 
          title="Choose Another Venue" 
          icon={SelectVenue} 
        >
          <VenuePicker 
            venues_data={all_venues_data} 
            favorite_venues_data={favorite_venues_data} 
            on_select_venue={on_select_venue} 
          />
        </DrawerSection>

        <DrawerSection 
          title={current_venue_data.name} 
          icon={CurrentVenue}
        >
          <CurrentVenueDetails 
            day_data={day_data} 
            venue_data={current_venue_data} 
            is_favorited={favorite_venues_data.includes(current_venue_data.id)} 
          />
        </DrawerSection>
      </div>
    </div>
  )
}

const DrawerSection = ({ 
  title, 
  icon, 
  children, 
  is_link = false, 
  on_header_click, 
  default_expanded = false 
}) => {
  const [is_expanded, setIsExpanded] = useState(default_expanded);

  const handle_click = () => {
    if (is_link) {
      if (on_header_click) on_header_click();
    } else {
      setIsExpanded(!is_expanded);
    }
  };

  return (
    <div className="drawer-item-wrapper">
      <div className="drawer-item-header" onClick={handle_click} style={{ cursor: 'pointer' }}>
        <h3>{title}</h3>
        <Icon src={icon} alt={title} />
      </div>

      {/* Collapsible Content Area */}
      {!is_link && (
        <div className={`drawer-item-content-wrapper ${is_expanded ? 'open' : ''}`}>
          <div className="drawer-item-content-inner">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Drawer;