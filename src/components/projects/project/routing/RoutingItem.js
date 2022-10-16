import React from "react";
import Button from "../../../elements/Button";
import List from "../../../elements/List";
import style from "./RoutingItem.module.css";

const RoutingItem = (props) => {
  const { value, names, editing = false } = props;

  const buttons = (
    <div>
      <Button>+</Button>
      <Button>-</Button>
    </div>
  );

  const handleClickContent = (index) => {
    props.onSelect(index);
  };

  const contentList = names.map((name, index) => {
    return (
      <li key={name}>
        {editing && <Button>-</Button>}
        <p
          onClick={() => {
            handleClickContent(index);
          }}
        >
          {name}
        </p>
      </li>
    );
  });

  return (
    <li className={style.item}>
      <div className={style.header}>
        <p>{value.name}</p>
        {editing && buttons}
      </div>

      <List className={style.contentList}>{contentList}</List>
    </li>
  );
};

export default RoutingItem;
