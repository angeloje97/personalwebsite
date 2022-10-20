import { useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import style from "./Content.module.css";
import Blog from "./Blog";
import Module from "./Module";

const Content = (props) => {
  const { classtype = "", className = "" } = props;

  const routingData = useSelector((state) => state.proj.routingData);
  const { sectionIndex, contentIndex } = routingData;

  const content = useSelector(
    (state) =>
      state.proj.currentProject.sections[sectionIndex].contents[contentIndex]
  );

  const finalStyle = styleGroup(style.content, classtype, className, style);

  if (!content) {
    return <div className={finalStyle}>No Content</div>;
  }

  const { type } = content;

  if (type.toLowerCase() === "blog") {
    return <Blog content={content} className={finalStyle} />;
  }

  if (type.toLowerCase() === "module") {
    return <Module content={content} className={finalStyle} />;
  }

  return <div className={finalStyle}>Found no content of type {type}</div>;
};

export default Content;
