import { styleGroup } from "../../helpers/styles";
import style from "./InnerShadow.module.css";

//Parent component must have css styling of position: relative
const InnerShadow = (props) => {
  const { classtype = "", className = "" } = props;
  const finalClass = styleGroup(style.innerShadow, classtype, className, style);
  return <div className={finalClass} />;
};

export default InnerShadow;
