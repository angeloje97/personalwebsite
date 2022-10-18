import { useEffect, useState } from "react";
import { styleGroup } from "../../helpers/styles";
import Input from "./Input";
import style from "./LinkInput.module.css";

const LinkInput = (props) => {
  const {
    value = { name: "", url: "" },
    id = "",
    classtype = "",
    className = "",
  } = props;

  const finalClass = styleGroup(style.linkInput, classtype, className, style);

  const [data, setData] = useState(value);

  const updateData = (event) => {
    setData((prev) => {
      const newData = { ...prev };
      newData[event.target.id] = event.target.value;

      return newData;
    });
  };

  useEffect(() => {
    props.onChange({
      target: {
        id,
        value: data,
      },
    });
  }, [data]);

  return (
    <div className={finalClass}>
      <Input
        value={data.name}
        onChange={updateData}
        id="name"
        placeholder="name"
      />
      <Input
        value={data.url}
        onChange={updateData}
        id="url"
        placeholder="url"
      />
    </div>
  );
};

export default LinkInput;
