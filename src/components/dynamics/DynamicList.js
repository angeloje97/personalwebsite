import { useEffect, useState } from "react";
import { cloneElement } from "react";
import { styleGroup } from "../../helpers/styles";
import Button from "../elements/Button";
import style from "./DynamicList.module.css";

const DynamicList = (props) => {
  const {
    controlValue = true,
    startingValue = [],
    showButtons = true,
    max = 5,
    classtype = "",
    className = "",
  } = props;
  const finalClass = styleGroup(style.dynamicList, classtype, className, style);

  const [count, setCount] = useState(
    startingValue.length >= 1 ? startingValue.length : 1
  );
  const [data, setData] = useState(startingValue);

  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  let content = [];

  const handleChange = (event) => {
    setData((prev) => {
      const newData = [...prev];
      newData[event.target.id] = event.target.value;

      return newData;
    });
  };

  useEffect(() => {
    props.onChange(data);
  }, [data]);

  useEffect(() => {
    const newData = [];

    for (let i = 0; i < count; i++) {
      if (i >= data.length) {
        newData.push({ name: "", link: "" });
        continue;
      }
      newData.push(data[i]);
    }

    setData(newData);
  }, [count]);

  for (let i = 0; i < count; i++) {
    const current = { ...children[0] };

    current.index = i;
    current.onChange = handleChange;

    const childProps = {
      onChange: handleChange,
      id: i,
      key: i,
    };

    if (controlValue) {
      childProps.value = data[i];
    }
    content.push(cloneElement(children[0], childProps));
  }

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  const buttons = (
    <section className={style.buttons}>
      {count < max && (
        <Button onClick={increment} type="button">
          +
        </Button>
      )}
      {count > 1 && (
        <Button onClick={decrement} type="button">
          -
        </Button>
      )}
    </section>
  );

  return (
    <div className={finalClass}>
      <div>{content}</div>
      {showButtons && buttons}
    </div>
  );
};

export default DynamicList;
