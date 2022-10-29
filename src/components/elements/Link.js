import { styleGroup } from "../../helpers/styles";
import style from "./Link.module.css";
const Link = (props) => {
  const { classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.link, classtype, className, style);
  return (
    <a {...props} className={finalClass} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
};
export default Link;
