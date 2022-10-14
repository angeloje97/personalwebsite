import { useState } from "react";

import style from "./Tabs.module.css";
import { styleGroup } from "../../helpers/styles";
import Button from "../elements/Button";
const Tabs = (props) => {
  const { classtype = "", className = "", tabs = [] } = props;
  const [currentTab, setCurrentTab] = useState(null);
  const finalClass = styleGroup(style.tabs, classtype, className, style);

  const handleClickTab = (event) => {
    setCurrentTab(event.target.id);

    if (props.onChangeTab) {
      props.onChangeTab(event.target.id);
    }
  };

  const tabContent = tabs.map((tab) => {
    const selectedClass =
      tab === currentTab ? `${style.tab} ${style.selectedTab}` : style.tab;

    return (
      <Button
        onClick={handleClickTab}
        id={tab}
        key={tab}
        className={selectedClass}
      >
        {tab}
      </Button>
    );
  });
  return <div className={finalClass}>{tabContent}</div>;
};

export default Tabs;
