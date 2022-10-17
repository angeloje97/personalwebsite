import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import Button from "../../../elements/Button";
import List from "../../../elements/List";
import style from "./ProjectRouting.module.css";
import RoutingItem from "./RoutingItem";
import SectionForm from "./SectionForm";
import { projActions } from "../../../../store/projects";

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

  const dispatch = useDispatch();

  const [routingData, setRoutingData] = useState({ name: "Overview" });
  const [editorData, setEditorData] = useState({
    editingSection: false,
    editingContent: false,
  });

  const sections = currentProject.sections || FALLBACK;

  const editing = useSelector((state) => state.proj.editing);
  const finalClass = styleGroup(style.routing, classtype, className, style);

  const handleChangeRoute = (routeData) => {
    setRoutingData(routeData);
    props.onChangeRoute(routeData);
  };

  const handleSelectSection = (sectionIndex) => {
    setRoutingData((prev) => {
      const newData = { ...prev };
      newData.selectedSection = sectionIndex;
      return newData;
    });
  };

  const toggleSectionEditor = () => {
    setEditorData((prev) => {
      const newData = { ...prev };
      newData.editingSection = !prev.editingSection;

      return newData;
    });
  };

  const handleRemoveSection = (sectionIndex) => {
    console.log(sectionIndex);

    const updatedSections = sections.filter(
      (section, index) => index !== sectionIndex
    );

    const updatedProject = { ...currentProject };
    updatedProject.sections = updatedSections;

    dispatch(projActions.setCurrentProject({ project: updatedProject }));
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
        onSelectSection={handleSelectSection}
        onRemoveSection={handleRemoveSection}
        name={section.name}
        names={names}
        key={section.name}
        editing={editing}
        routingData={routingData}
        index={index}
      >
        {section.name}
      </RoutingItem>
    );
  });

  const overviewName =
    routingData.name.toLowerCase() === "overview" ? `<Overview>` : "Overview";

  const overview = (
    <div className={style.overview}>
      <p onClick={() => handleChangeRoute({ name: "Overview" })}>
        {overviewName}
      </p>
    </div>
  );

  return (
    <div className={finalClass}>
      {overview}
      <List className={style.routingList}>{routes}</List>
      {editing && <EditorButtons onShowNewSection={toggleSectionEditor} />}
      {editorData.editingSection && (
        <SectionForm onClose={toggleSectionEditor} />
      )}
    </div>
  );
};

const EditorButtons = (props) => {
  return (
    <div className={style.routingButtons}>
      <Button onClick={props.onShowNewSection}>+</Button>
    </div>
  );
};

export default ProjectRouting;
