import { useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import style from "./Content.module.css";
import Blog from "./Blog";
import Module from "./Module";
import { useContent } from "../../../../custom-hooks/website-projects";

const Content = (props) => {
  const { classtype = "", className = "" } = props;

  const content = useContent();

  const finalStyle = styleGroup(style.content, classtype, className, style);

  if (!content) {
    return <div className={finalStyle}>No Content</div>;
  }

  const { type } = content;

  if (type.toLowerCase() === "blog") {
    return <Blog className={finalStyle} />;
  }

  if (type.toLowerCase() === "module") {
    return <Module className={finalStyle} />;
  }

  return <div className={finalStyle}>Found no content of type {type}</div>;
};

export default Content;
