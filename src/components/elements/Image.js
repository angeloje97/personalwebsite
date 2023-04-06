import Image from "next/image";
import { styleGroup } from "../../helpers/styles";
import style from "./Image.module.css";

const NewImage = (props) => {
  const { src, classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.image, classtype, className, style);

  return <img {...props} src={src} className={finalClass} priority="true" />;
};

export default NewImage;
