import { useEffect, useRef, useState } from "react";
import React from "react";
import Button from "../../../elements/Button";
import Icon from "../../../elements/Icon";
import List from "../../../elements/List";
import ContentForm from "./ContentForm";
import style from "./RoutingItem.module.css";
import { projActions } from "../../../../store/projects";
import { useDispatch, useSelector } from "react-redux";

const RoutingItem = (props) => {
  const {
    name,
    names,
    routingData,
    index: sectionIndex,
    editing = false,
  } = props;

  const dispatch = useDispatch();
  const [openContent, setOpenContent] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const editingContent = useSelector((state) => state.proj.editingContent);

  const dragItem = useRef(null);
  const dragOver = useRef(null);

  const toggleContent = () => {
    setOpenContent((prev) => !prev);
  };

  const handleRemoveSection = () => {
    props.onRemoveSection(sectionIndex);
  };

  const toggleCreateNew = () => {
    handleClickSection();
    setCreateNew((prev) => !prev);
  };

  const handleEdit = () => {
    if (props.onEdit) {
      props.onEditSection(sectionIndex);
    }
  };

  // const buttons = (
  //   <div>
  //     <Button onClick={handleEdit}>
  //       <Icon icon="edit" />
  //     </Button>
  //     <Button onClick={toggleCreateNew}>+</Button>
  //     <Button onClick={handleRemoveSection}>-</Button>
  //   </div>
  // );

  const buttons = (
    <SectionEditorButtons
      toggleCreateNew={toggleCreateNew}
      handleRemoveSection={handleRemoveSection}
      sectionIndex={sectionIndex}
    />
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
          <ContentEditorButtons
            sectionIndex={sectionIndex}
            contentIndex={index}
            onDeleteContent={() => handleDeleteContent(index)}
          />
        )}
      </li>
    );
  });

  let sectionClass = style.section;

  return (
    <li
      className={style.item}
      onDragStart={props.onDragStart}
      onDragEnter={props.onDragEnter}
      onDragEnd={props.onDragEnd}
      draggable={editing}
    >
      <div className={sectionClass}>
        <p onClick={toggleContent}>{name}</p>
        {editing && buttons}
      </div>
      {openContent && <List className={style.contentList}>{contentList}</List>}
      {editingContent && <ContentForm sectionIndex={sectionIndex} />}
    </li>
  );
};

const SectionEditorButtons = (props) => {
  const { toggleCreateNew, handleRemoveSection, sectionIndex } = props;
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(
      projActions.update({
        editingSection: true,
        editingSectionIndex: sectionIndex,
      })
    );
  };

  const handleCreateNewContent = () => {
    dispatch(
      projActions.update({
        editingContent: true,
        editingContentIndex: -1,
        editingSectionIndex: sectionIndex,
      })
    );
  };

  return (
    <div>
      <Button onClick={handleEdit}>
        <Icon icon="edit" />
      </Button>
      <Button onClick={handleCreateNewContent}>+</Button>
      <Button onClick={handleRemoveSection}>-</Button>
    </div>
  );
};

const ContentEditorButtons = (props) => {
  const { sectionIndex, contentIndex } = props;

  const dispatch = useDispatch();

  const handleEditContent = () => {
    dispatch(
      projActions.update({
        editingContent: true,
        editingSectionIndex: sectionIndex,
        editingContentIndex: contentIndex,
      })
    );
  };
  return (
    <div className={style.contentButtons}>
      <Button onClick={handleEditContent}>
        <Icon icon="edit" />
      </Button>
      <Button onClick={props.onDeleteContent}>-</Button>
    </div>
  );
};

export default RoutingItem;
