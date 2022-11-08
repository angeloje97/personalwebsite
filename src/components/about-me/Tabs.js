import { useState } from "react";

import style from "./Tabs.module.css";
import { styleGroup } from "../../helpers/styles";
import Button from "../elements/Button";
import { useSelector } from "react-redux";
import Input from "../elements/Input";
const Tabs = (props) => {
  const { classtype = "", className = "", files = [] } = props;
  const [currentTab, setCurrentTab] = useState(null);
  const finalClass = styleGroup(style.tabs, classtype, className, style);
  const removing = useSelector((state) => state.aboutMe.removing);

  const handleClickTab = (name) => {
    setCurrentTab(name);

    if (props.onChangeTab) {
      props.onChangeTab(name);
    }
  };

  const tabContent = files.map((file) => {
    const selectedClass =
      file.name === currentTab
        ? `${style.tab} ${style.selectedTab}`
        : style.tab;

    return (
      <Button
        onClick={() => {
          handleClickTab(file.name);
        }}
        id={file._id}
        key={file._id}
        className={selectedClass}
      >
        <div>
          <p>{file.name}</p>
          {removing && <RemovableContent />}
        </div>
      </Button>
    );
  });
  return <div className={finalClass}>{tabContent}</div>;
};

const RemovableContent = () => {
  return <Input type="checkbox" />;
};

export default Tabs;
