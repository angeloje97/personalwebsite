import { styleGroup } from "../../../helpers/styles";
import List from "../../elements/List";
import style from "./ProjectRouting.module.css";

const MAIN = ["Overview", "Blog Posts", "Modules"];

const ProjectRouting = (props) => {
  const { project, classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.routing, classtype, className, style);

  const routes = MAIN.map((item) => (
    <li key={item}>
      <p className={style.item}>{item}</p>
    </li>
  ));
  return (
    <div className={finalClass}>
      <List className={style.routingList}>{routes}</List>
    </div>
  );
};
export default ProjectRouting;
