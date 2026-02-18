import { useState } from 'react';
import FillBar from '../atoms/FillBar';
import Chip from '../atoms/Chip';
import Icon from '../atoms/Icon';

import VenueSwitcher from '../molecules/DashboardVenueSwitcher';
import CurrentVenueDetails from '../molecules/DashboardCurrentVenueDetails';

import YourAccount from '../../assets/your-account.svg';

const DashboardDrawer = ({ is_open, current_venue_data, all_venues_data, on_close }) => {
  return (
    <div className={`drawer-overlay ${is_open ? "open" : ""}`} onClick={on_close}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <DrawerItemWrapper>
          <DrawerItemHeader title="Your Account" icon={YourAccount} on_click={() => alert("Account details coming soon!")} />
        </DrawerItemWrapper>

        <DrawerItemWrapper>
          <DrawerItemHeader title="Choose Another Venue" icon={YourAccount} on_click={() => alert("Venue switching coming soon!")} />
          <VenueSwitcher />
        </DrawerItemWrapper>

        <DrawerItemWrapper>
          <DrawerItemHeader title={current_venue_data.name} icon={YourAccount} on_click={() => alert("Current venue details coming soon!")} />
          <CurrentVenueDetails />
        </DrawerItemWrapper>
      </div>
    </div>
  )
}

const DrawerItemWrapper = ({ children }) => {
  return <div className="drawer-item">{children}</div>;
};

const DrawerItemHeader = ({ title, icon, on_click }) => {
  return (
    <div className="drawer-item-header" onClick={on_click} style={{ cursor: 'pointer' }}>
      <h3>{title}</h3>
      <Icon src={icon} alt={title} />
    </div>
  );
}

export default DashboardDrawer;