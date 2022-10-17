import { formattedDate } from "../../../helpers/stringHelper";
import { useDispatch, useSelector } from "react-redux";
import { projActions } from "../../../store/projects";
import Tag from "../../elements/Tag";
import Input from "../../elements/Input";
import style from "./ProjectList.module.css";
import React, { useState } from "react";
import NewProject from "./NewProject";

const ProjectItem = (props) => {
  const { project } = props;
  const isRemoving = useSelector((state) => state.proj.removing);
  const isEditing = useSelector((state) => state.proj.editing);
  const [editingCurrent, setEditingCurrent] = useState(false);

  const tags = project.tags.map((resource) => (
    <Tag key={resource}>{resource}</Tag>
  ));

  const handleSelectItem = () => {
    if (isRemoving) return;
    if (isEditing) {
      setEditingCurrent(true);
      return;
    }
    props.onSelect(project);
  };

  const handleEditingClose = () => {
    setEditingCurrent(false);
  };

  const date = formattedDate(new Date(project.updated));

  return (
    <React.Fragment>
      <li
        className={`${style.projectItem} ${style.existingProject}`}
        onClick={handleSelectItem}
        value={project}
      >
        <h3>
          {project.name}
          {project.favorite && (
            <img
              src="/resources/icons/star.png"
              className={style.favoriteImage}
            />
          )}
        </h3>
        <p>{project.type}</p>
        <p className={style.lastUpdate}>Last Update: {date}</p>
        <div className={style.tags}>
          {tags} {isRemoving && <RemovableContent project={project} />}
        </div>
      </li>
      {editingCurrent && isEditing && (
        <EditingContent project={project} onClose={handleEditingClose} />
      )}
    </React.Fragment>
  );
};

const RemovableContent = ({ project }) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    var checked = event.target.checked;

    dispatch(
      projActions.projectIdSelect({ projectId: project._id, add: checked })
    );
  };

  return <Input type="checkbox" onChange={handleChange} />;
};

const EditingContent = ({ project, onClose }) => {
  return (
    <NewProject editing={project} onClose={onClose} label={project.name} />
  );
};
export default ProjectItem;
