import Image from "next/image";
import { styleGroup } from "../../helpers/styles";
import style from "./Image.module.css";

const NewImage = (props) => {
  const { src, classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.image, classtype, className, style);

  return <Image {...props} src={src} className={finalClass} priority />;
};

export default NewImage;
