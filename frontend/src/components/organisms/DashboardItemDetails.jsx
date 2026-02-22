import { useState, useEffect } from 'react';

import { EMPTY_ITEM_DATA } from '../../SAMPLEDATA';

const ItemDetails = ({ is_open, on_close, menu_item_data = EMPTY_ITEM_DATA, on_interact }) => {
  return (
    <div className={`drawer-overlay ${is_open ? "open" : ""}`} onClick={on_close}>
      <div className="item-drawer-content" onClick={(e) => e.stopPropagation()}>
        <h2>{menu_item_data.name}</h2>
      </div>
    </div>
  )
}

export default ItemDetails;