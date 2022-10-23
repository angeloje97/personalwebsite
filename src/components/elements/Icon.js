import style from "./Icon.module.css";
import { styleGroup } from "../../helpers/styles";

const Icon = (props) => {
  const { icon = "", size = 24, classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.icon, classtype, className, style);

  const iconLocation = `/resources/icons/${icon}.png`;

  return (
    <img
      src={iconLocation}
      className={finalClass}
      style={{ height: `${size}px` }}
    />
  );
};

export default Icon;
