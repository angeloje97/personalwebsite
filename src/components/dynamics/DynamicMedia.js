import ReactPlayer from "react-player";
import { styleGroup } from "../../helpers/styles";
import style from "./DynamicMedia.module.css";

const DynamicMedia = (props) => {
  const { mediatype = "", classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.media, classtype, className, style);

  const inputString =
    typeof mediatype === "string" ? mediatype.toLowerCase() : "";

  if (inputString === "video") {
    return <ReactPlayer {...props} className={finalClass} />;
  }

  return <img {...props} className={finalClass} />;
};

export default DynamicMedia;
