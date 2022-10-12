import { formattedDate } from "../../../helpers/stringHelper";
import { styleGroup } from "../../../helpers/styles";
import InnerShadow from "../../elements/InnerShadow";
import style from "./ProjectHeader.module.css";

const ProjectHeader = (props) => {
  const { project, classtype = "", className = "" } = props;
  const finalClass = styleGroup(style.header, classtype, className, style);

  const createdDate = formattedDate(new Date(project.created));

  return (
    <div className={finalClass}>
      <InnerShadow />
      <h1>{project.name}</h1>
      <p>Document Created: {createdDate}</p>
    </div>
  );
};

export default ProjectHeader;
