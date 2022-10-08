import { styleGroup } from "../../helpers/styles";
import style from "./Input.module.css";

const Input = (props) => {
  const { inputtype = "", className = "" } = props;

  const finalClass = styleGroup(style.input, inputtype, className, style);

  return (
    <input {...props} className={finalClass}>
      {props.children}
    </input>
  );
};

export default Input;
