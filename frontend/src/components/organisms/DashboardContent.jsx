import SearchBar from "../molecules/SearchBar";
import DashboardItem from "../molecules/DashboardItem";
import { useState, useEffect } from 'react';

import { SAMPLE_ITEM_COLLECTION } from "../../SAMPLEDATA";

const Content = ({ on_searchbar_click, on_item_click }) => {
  const [items, setItems] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const handleFetch = async () => {
    const res = await fetch(`http://localhost:3000/api/menu/get_menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ diningHallID : "de-neve-dining" }),
    });
    console.log(res.status)
    var data = await res.json();
    setItems(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);


  if (loading) return <p>Loading...</p>;

    return (
    <div className="dashboard-content">
      <div style={{ position: "sticky", top: 0, zIndex: 15, paddingBottom: "16px" }}>
        <SearchBar placeholder="Narrow menu..." button_only={true} on_interact={on_searchbar_click} />
      </div>
      {items.map((item, index) => (
        <DashboardItem key={index} item_data={item} on_click={() => on_item_click(item)} />
      ))}
    </div>
  );
}

export default Content;
