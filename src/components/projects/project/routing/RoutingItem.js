import { useEffect, useRef, useState } from "react";
import React from "react";
import Button from "../../../elements/Button";
import List from "../../../elements/List";
import ContentForm from "./ContentForm";
import style from "./RoutingItem.module.css";
import { projActions } from "../../../../store/projects";
import { useDispatch } from "react-redux";

const RoutingItem = (props) => {
  const {
    name,
    names,
    routingData,
    index: sectionIndex,
    editing = false,
  } = props;

  const dispatch = useDispatch();
  const selectedSection = routingData.selectedSection === sectionIndex;

  const [createNew, setCreateNew] = useState(false);

  const dragItem = useRef(null);
  const dragOver = useRef(null);

  const handleRemoveSection = () => {
    props.onRemoveSection(sectionIndex);
  };

  const toggleCreateNew = () => {
    handleClickSection();
    setCreateNew((prev) => !prev);
  };

  const buttons = (
    <div>
      <Button onClick={toggleCreateNew}>+</Button>
      <Button onClick={handleRemoveSection}>-</Button>
    </div>
  );

  const handleClickContent = (index) => {
    props.onSelect(index);
  };

  const handleClickSection = () => {
    props.onSelectSection(sectionIndex);
  };

  const handleDeleteContent = (index) => {
    props.onRemoveContent(sectionIndex, index);
    dispatch(
      projActions.removeContent({
        sectionIndex,
        contentIndex: index,
      })
    );
  };

  const handleDragEnd = () => {
    props.onMoveContent(dragItem.current, dragOver.current, sectionIndex);
    dragItem.current = null;
    dragOver.current = null;
  };

  const contentList = names.map((name, index) => {
    const isSelected =
      (routingData.sectionIndex === sectionIndex) &
      (routingData.contentIndex === index);

    const itemStyle = isSelected ? style.selectedContent : "";

    return (
      <li
        key={name}
        className={itemStyle}
        draggable={editing}
        onDragEnter={() => {
          dragOver.current = index;
        }}
        onDragStart={() => {
          dragItem.current = index;
        }}
        onDragEnd={handleDragEnd}
      >
        <p
          onClick={() => {
            handleClickContent(index);
          }}
        >
          {name}
        </p>
        {editing && (
          <Button
            onClick={() => {
              handleDeleteContent(index);
            }}
          >
            -
          </Button>
        )}
      </li>
    );
  });

  let sectionClass = style.section;

  if (selectedSection) {
    sectionClass += ` ${style.selectedSection}`;
  }

  return (
    <li
      className={style.item}
      onDragStart={props.onDragStart}
      onDragEnter={props.onDragEnter}
      onDragEnd={props.onDragEnd}
      draggable={editing}
    >
      <div className={sectionClass}>
        <p onClick={handleClickSection}>{name}</p>
        {editing && buttons}
      </div>
      {selectedSection && (
        <List className={style.contentList}>{contentList}</List>
      )}
      {createNew && (
        <ContentForm onClose={toggleCreateNew} sectionIndex={sectionIndex} />
      )}
    </li>
  );
};

export default RoutingItem;
