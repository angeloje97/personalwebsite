import style from "./testing.module.css";
import DynamicList from "../src/components/dynamics/DynamicList";
import { useState } from "react";
import Input from "../src/components/elements/Input";
import Select from "../src/components/elements/Select";
const Testing = () => {
  const [data, setData] = useState([""]);
  const handleChangeData = (data) => {
    console.log(data);
    setData(data);
  };

  const [selectData, setSelectData] = useState(["1st"]);

  const handleChangeSelect = (data) => {
    console.log(data);
    setSelectData(data);
  };

  return (
    <div className={style.test1}>
      <DynamicList onChange={handleChangeData} startingValue={data}>
        <Input></Input>
      </DynamicList>

      <DynamicList
        onChange={handleChangeSelect}
        startingValue={selectData}
        templateValue={"1st"}
      >
        <Select>
          <option>1st</option>
          <option>2nd</option>
          <option>3rd</option>
        </Select>
      </DynamicList>

      <p>{data.join(", ")}</p>
    </div>
  );
};
export default Testing;
