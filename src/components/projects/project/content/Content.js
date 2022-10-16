import { useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import style from "./Content.module.css";
import { TESTING_SECTIONS } from "../routing";

const Content = (props) => {
  const {
    sectionIndex = 0,
    contentIndex = 0,
    classtype = "",
    className = "",
  } = props;
  const finalStyle = styleGroup(style.content, classtype, className, style);
  const sections =
    useSelector((state) => state.proj.currentProject.sections) ||
    TESTING_SECTIONS;

  const content = sections
    ? sections[sectionIndex].content[contentIndex]
    : undefined;

  if (!content) {
    return <div className={finalStyle}>No Content</div>;
  }

  const { type } = content;

  return <div className={finalStyle}></div>;
};

export default Content;
