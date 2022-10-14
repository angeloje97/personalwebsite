import React, { useEffect, useState } from "react";
import { styleGroup } from "../../helpers/styles";
import style from "./DynamicInput.module.css";
import Input from "../elements/Input";
import Select from "../elements/Select";
import TextArea from "../elements/TextArea";

const DynamicInput = (props) => {
  const {
    id = "",
    placeholder = "",
    dynamicType = "input",
    types = ["Input"],
    value = { type: types[0], value: "" },
    classtype = "",
    className = "",
  } = props;

  const isTextArea = dynamicType === "textarea";

  const [data, setData] = useState({
    id,
    target: value,
  });

  const finalClass = styleGroup(style.dynamic, classtype, className, style);

  const options = types.map((type) => {
    return (
      <option value={type} key={type}>
        {type}
      </option>
    );
  });

  const updateData = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    setData((prev) => {
      const newData = {
        target: {},
      };

      newData.target = { ...data.target };
      newData.target[id] = value;

      for (const prop in prev) {
        if (prop === "target") continue;
        newData[prop] = prev[prop];
      }
      return newData;
    });
  };

  useEffect(() => {
    props.onChange(data);
  }, [data]);

  return (
    <div className={finalClass} id={data.id}>
      <Select
        name="type"
        id="type"
        onChange={updateData}
        value={data.target.type || types[0]}
      >
        {options}
      </Select>

      {isTextArea ? (
        <TextArea
          onChange={updateData}
          placeholder={placeholder}
          value={data.target.value && data.target.value}
          id="value"
        />
      ) : (
        <Input
          onChange={updateData}
          placeholder={placeholder}
          value={data.target.value}
          id="value"
        ></Input>
      )}
    </div>
  );
};

export default DynamicInput;
