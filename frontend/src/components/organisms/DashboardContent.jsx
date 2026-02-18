import DashboardItem from "../molecules/DashboardItem";

import { SAMPLE_ITEM_COLLECTION } from "../../SAMPLEDATA";

const Content = () => {
  return (
    <div className="dashboard-content">
      {SAMPLE_ITEM_COLLECTION.map((item, index) => (
        <DashboardItem key={index} item_data={item} />
      ))}
    </div>
  );
}

export default Content;