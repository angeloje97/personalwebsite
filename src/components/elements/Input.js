import { styleGroup } from "../../helpers/styles";
import style from "./Input.module.css";

const Input = (props) => {
  const { inputtype = "", className = "" } = props;

  const finalClass = styleGroup(style.input, inputtype, className, style);

  return (
    <input {...props} className={finalClass} value={props.value || ""}>
      {props.children}
    </input>
  );
};

export default Input;
