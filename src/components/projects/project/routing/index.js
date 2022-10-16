import { useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import Button from "../../../elements/Button";
import List from "../../../elements/List";
import style from "./ProjectRouting.module.css";
import RoutingItem from "./RoutingItem";

export const TESTING_SECTIONS = [
  {
    name: "Module",
    testing: true,
    content: [
      { name: "Mid Term", type: "Blog" },
      { name: "Final", type: "Blog" },
    ],
  },
];
const FALLBACK = [];

const ProjectRouting = (props) => {
  const { classtype = "", className = "" } = props;

  const currentProject = useSelector((state) => state.proj.currentProject);

  const sections = currentProject.sections || TESTING_SECTIONS;

  const editing = useSelector((state) => state.proj.editing);
  const finalClass = styleGroup(style.routing, classtype, className, style);

  const handleChangeRoute = (routeData) => {
    props.onChangeRoute(routeData);
  };

  const routes = sections.map((section, index) => {
    const names = section.content.map((content) => content.name);
    return (
      <RoutingItem
        onSelect={(itemIndex) =>
          handleChangeRoute({
            name: "Content",
            sectionIndex: index,
            contentIndex: itemIndex,
          })
        }
        value={{ name: section.name, index }}
        names={names}
        key={section.name}
        editing={editing}
      >
        {section.name}
      </RoutingItem>
    );
  });

  const overview = (
    <div className={style.overview}>
      <p onClick={() => handleChangeRoute({ name: "Overview" })}>Overview</p>
    </div>
  );

  return (
    <div className={finalClass}>
      {overview}
      <List className={style.routingList}>{routes}</List>
      {editing && <EditorButtons />}
    </div>
  );
};

const EditorButtons = (props) => {
  return (
    <div className={style.routingButtons}>
      <Button>+</Button>
    </div>
  );
};

export default ProjectRouting;
