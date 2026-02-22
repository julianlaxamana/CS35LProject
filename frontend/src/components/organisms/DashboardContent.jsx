import SearchBar from "../molecules/SearchBar";
import DashboardItem from "../molecules/DashboardItem";

import { SAMPLE_ITEM_COLLECTION } from "../../SAMPLEDATA";

const Content = ({ on_searchbar_click }) => {
  return (
    <div className="dashboard-content">
      <div style={{ position: "sticky", top: 0, zIndex: 15, paddingBottom: "16px" }}>
        <SearchBar placeholder="Narrow menu..." button_only={true} on_interact={on_searchbar_click} />
      </div>
      {SAMPLE_ITEM_COLLECTION.map((item, index) => (
        <DashboardItem key={index} item_data={item} />
      ))}
    </div>
  );
}

export default Content;