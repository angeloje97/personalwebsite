import style from "./Button.module.css";
import { styleGroup } from "../../helpers/styles";

const Button = (props) => {
  const { classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.button, classtype, className, style);
  return (
    <button {...props} className={finalClass}>
      {props.children}
    </button>
  );
};

export default Button;
