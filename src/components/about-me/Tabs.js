import { useState } from "react";

import style from "./Tabs.module.css";
import { styleGroup } from "../../helpers/styles";
import Button from "../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import Input from "../elements/Input";
import { aboutMeActions } from "../../store/about-me";

const Tabs = (props) => {
  const { classtype = "", className = "", files = [] } = props;
  const [currentTab, setCurrentTab] = useState(null);
  const dispatch = useDispatch();
  const finalClass = styleGroup(style.tabs, classtype, className, style);

  const editingFileNames = useSelector(
    (state) => state.aboutMe.editingFileNames
  );

  const removing = useSelector((state) => state.aboutMe.removing);

  const handleClickTab = (selectedFile) => {
    if (editingFileNames) {
      const index = files.findIndex((file) => file.name === selectedFile.name);
      dispatch(
        aboutMeActions.update({
          editingFile: true,
          editingFileIndex: index,
        })
      );
      return;
    }

    setCurrentTab(selectedFile.name);

    if (props.onChangeTab) {
      props.onChangeTab(selectedFile);
    }
  };

  const tabContent = files.map((file) => (
    <Tab
      file={file}
      currentTab={currentTab}
      removing={removing}
      dispatch={dispatch}
      onClickTab={handleClickTab}
      key={file._id}
    />
  ));
  return <div className={finalClass}>{tabContent}</div>;
};

const Tab = (props) => {
  const { file, currentTab, removing, dispatch, onClickTab } = props;

  const selectedClass =
    file.name === currentTab ? `${style.tab} ${style.selectedTab}` : style.tab;

  const handleSelectChange = (event) => {
    dispatch(
      aboutMeActions.setSelectFile({
        file,
        selected: event.target.checked,
      })
    );
  };

  return (
    <Button
      onClick={() => {
        onClickTab(file);
      }}
      id={file._id}
      key={file._id}
      className={selectedClass}
    >
      <div>
        <p>{file.name}</p>
        {removing && <RemovableContent onChange={handleSelectChange} />}
      </div>
    </Button>
  );
};

const RemovableContent = (props) => {
  return <Input type="checkbox" onChange={props.onChange} />;
};

export default Tabs;
