import { styleGroup } from "../../helpers/styles";
import style from "./TextArea.module.css";

const TextArea = (props) => {
  const { classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.textarea, classtype, className, style);
  return (
    <textarea {...props} className={finalClass}>
      {props.children}
    </textarea>
  );
};

export default TextArea;
