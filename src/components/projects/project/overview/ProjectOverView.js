import { styleGroup } from "../../../../helpers/styles";
import InnerShadow from "../../../elements/InnerShadow";
import style from "./ProjectOverView.module.css";
const ProjectOverView = (props) => {
  const { project, classtype = "", className = "" } = props;
  const finalClass = styleGroup(style.overview, classtype, className, style);
  return (
    <div className={finalClass}>
      <InnerShadow />
      <h2>Overview</h2>
    </div>
  );
};

export default ProjectOverView;
