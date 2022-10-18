import { styleGroup } from "../../../../helpers/styles";
import DynamicList from "../../../dynamics/DynamicList";
import Input from "../../../elements/Input";
import LinkInput from "../../../elements/LinkInput";
import style from "./Module.module.css";

const Module = (props) => {
  const { content, classtype = "", className = "" } = props;

  const finalStyle = styleGroup(style.module, classtype, className, style);

  const handleChange = (data) => {
    console.log(data);
  };

  return <div className={finalStyle}></div>;
};

export default Module;
