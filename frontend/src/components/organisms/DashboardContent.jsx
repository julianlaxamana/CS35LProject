import SearchBar from "../molecules/SearchBar";
import DashboardItem from "../molecules/DashboardItem";

import { SAMPLE_ITEM_COLLECTION } from "../../SAMPLEDATA";

const Content = () => {
  return (
    <div className="dashboard-content">
      <div style={{ position: "sticky", top: 0, zIndex: 15, paddingBottom: "16px" }}>
        <SearchBar placeholder="Search menu items..." />
      </div>
      {SAMPLE_ITEM_COLLECTION.map((item, index) => (
        <DashboardItem key={index} item_data={item} />
      ))}
    </div>
  );
}

export default Content;