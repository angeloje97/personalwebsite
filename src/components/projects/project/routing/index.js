import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import Button from "../../../elements/Button";
import List from "../../../elements/List";
import style from "./ProjectRouting.module.css";
import RoutingItem from "./RoutingItem";
import SectionForm from "./SectionForm";
import { projActions } from "../../../../store/projects";
import { useRouter } from "next/router";

export const TESTING_SECTIONS = [
  {
    name: "Module",
    testing: true,
    contents: [
      { name: "Mid Term", type: "Blog" },
      { name: "Final", type: "Blog" },
    ],
  },
];
const FALLBACK = [];

const ProjectRouting = (props) => {
  const { routingData, classtype = "", className = "" } = props;

  const currentProject = useSelector((state) => state.proj.currentProject);
  const editingSection = useSelector((state) => state.proj.editingSection);

  const dispatch = useDispatch();

  const sections = currentProject.sections || FALLBACK;

  const editing = useSelector((state) => state.proj.editing);
  const finalClass = styleGroup(style.routing, classtype, className, style);

  const handleChangeRoute = (routeData) => {
    props.onChangeRoute(routeData);
  };

  const handleMoveContent = (from, to, sectionIndex) => {
    const contents = sections[sectionIndex].contents;
    const length = contents.length;

    if (to < 0 || to >= length) return;

    const content = contents[from];

    const newContents = [];

    for (let i = 0; i < sections[sectionIndex].contents.length; i++) {
      if (i === from) continue;
      if (i === to) {
        newContents.push(content);
      }
      newContents.push(sections[sectionIndex].contents[i]);
    }

    dispatch(
      projActions.updateCurrentProjectContent({ newContents, sectionIndex })
    );
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
    if (sectionIndex === routingData.sectionIndex) {
      changeToOverview();
    }

    const updatedSections = sections.filter(
      (section, index) => index !== sectionIndex
    );

    const updatedProject = { ...currentProject };
    updatedProject.sections = updatedSections;

    dispatch(projActions.setCurrentProject({ project: updatedProject }));
  };

  const changeToOverview = () => {
    handleChangeRoute({ name: "Overview" });
  };

  const handleRemoveContent = (sectionIndex, contentIndex) => {
    if (routingData.sectionIndex !== sectionIndex) return;
    const contentLength = sections[sectionIndex].contents.length;
    if (contentLength > 1) {
      const nextIndex = contentIndex > 0 ? contentIndex - 1 : contentLength - 2;

      handleChangeRoute({
        name: "Content",
        sectionIndex,
        contentIndex: nextIndex,
      });
    } else {
      handleChangeRoute({ name: "Overview" });
    }
  };

  const routes = sections.map((section, index) => {
    const names = section.contents.map((content) => content.name);
    return (
      <RoutingItem
        onSelect={(itemIndex) =>
          handleChangeRoute({
            name: "Content",
            sectionIndex: index,
            contentIndex: itemIndex,
          })
        }
        onMoveContent={handleMoveContent}
        onSelectSection={handleSelectSection}
        onRemoveSection={handleRemoveSection}
        onRemoveContent={handleRemoveContent}
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

  let overviewName = "Overview";

  let overviewStyle = style.overview;
  if (routingData.name.toLowerCase() === "overview") {
    overviewStyle += ` ${style.selectedOverview}`;
  }

  const overview = (
    <div className={overviewStyle}>
      <p onClick={changeToOverview}>{overviewName}</p>
    </div>
  );

  return (
    <div className={finalClass}>
      {overview}
      <List className={style.routingList}>{routes}</List>
      {editing && <EditorButtons />}

      {editingSection && <SectionForm />}
    </div>
  );
};

const EditorButtons = (props) => {
  const dispatch = useDispatch();

  const handleOpenEditor = () => {
    dispatch(projActions.update({ editingSection: true }));
  };
  return (
    <div className={style.routingButtons}>
      <Button onClick={handleOpenEditor}>+</Button>
    </div>
  );
};

export default ProjectRouting;
