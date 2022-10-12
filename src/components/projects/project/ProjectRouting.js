import { styleGroup } from "../../../helpers/styles";
import List from "../../elements/List";
import style from "./ProjectRouting.module.css";

const ProjectRouting = (props) => {
  const { project, classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.routing, classtype, className, style);
  return (
    <div className={finalClass}>
      <List className={style.routingList}>
        <li>Overview</li>
        <li>Blog Posts</li>
        <li>Modules</li>
      </List>
    </div>
  );
};
export default ProjectRouting;
