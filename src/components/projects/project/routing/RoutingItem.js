import React from "react";
import Button from "../../../elements/Button";
import List from "../../../elements/List";
import style from "./RoutingItem.module.css";

const RoutingItem = (props) => {
  const {
    name,
    names,
    routingData,
    index: sectionIndex,
    editing = false,
  } = props;

  const selectedSection = routingData.selectedSection === sectionIndex;

  const handleRemoveSection = () => {
    props.onRemoveSection(sectionIndex);
  };

  const buttons = (
    <div>
      <Button>+</Button>
      <Button onClick={handleRemoveSection}>-</Button>
    </div>
  );

  const handleClickContent = (index) => {
    props.onSelect(index);
  };

  const handleClickSection = () => {
    props.onSelectSection(sectionIndex);
  };

  const contentList = names.map((name, index) => {
    const isSelected =
      (routingData.sectionIndex === sectionIndex) &
      (routingData.contentIndex === index);

    const itemStyle = isSelected ? style.selectedItem : "";
    const itemName = isSelected ? `<${name}>` : name;
    return (
      <li key={name} className={itemStyle}>
        {editing && <Button>-</Button>}
        <p
          onClick={() => {
            handleClickContent(index);
          }}
        >
          {itemName}
        </p>
      </li>
    );
  });

  return (
    <li className={style.item}>
      <div className={style.header}>
        <p onClick={handleClickSection}>{name}</p>
        {editing && buttons}
      </div>
      {selectedSection && (
        <List className={style.contentList}>{contentList}</List>
      )}
    </li>
  );
};

export default RoutingItem;
