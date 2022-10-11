import { formattedDate } from "../../../helpers/stringHelper";
import { useDispatch, useSelector } from "react-redux";
import { projActions } from "../../../store/projects";
import Tag from "../../elements/Tag";
import Input from "../../elements/Input";
import style from "./ProjectList.module.css";
import React from "react";

const ProjectItem = (props) => {
  const { project } = props;

  const isRemoving = useSelector((state) => state.proj.isRemoving);

  const tags = project.tags.map((resource) => (
    <Tag key={resource}>{resource}</Tag>
  ));

  const handleSelectItem = () => {
    if (isRemoving) return;
    props.onSelect(project);
  };

  const date = formattedDate(new Date(project.updated));

  return (
    <React.Fragment>
      <li
        className={`${style.projectItem} ${style.existingProject}`}
        onClick={handleSelectItem}
        value={project}
      >
        <h3>{project.name}</h3>
        <p>{project.type}</p>
        <p className={style.lastUpdate}>Last Update: {date}</p>
        <div className={style.tags}>
          {tags} <RemovableContent project={project} />
        </div>
      </li>
      <EditingContent project={project} />
    </React.Fragment>
  );
};

const RemovableContent = ({ project }) => {
  const isRemoving = useSelector((state) => state.proj.isRemoving);
  const dispatch = useDispatch();
  if (!isRemoving) return null;

  const handleChange = (event) => {
    var checked = event.target.checked;

    dispatch(
      projActions.projectIdSelect({ projectId: project._id, add: checked })
    );
  };

  return <Input type="checkbox" onChange={handleChange} />;
};
const EditingContent = ({ project }) => {
  const isEditing = useSelector((state) => state.proj.projectList.editing);
  if (!isEditing) return;
};
export default ProjectItem;
