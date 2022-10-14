import style from "./Select.module.css";
import { styleGroup } from "../../helpers/styles";

const Select = (props) => {
  const { classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.select, classtype, className, style);
  return (
    <select {...props} className={finalClass}>
      {props.children}
    </select>
  );
};

export default Select;
