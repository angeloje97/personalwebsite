import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import Button from "../../elements/Button";
import style from "./ProjectListEditor.module.css";
import { projActions } from "../../../store/projects";
import { removeSelectedProjects } from "../../../store/projActions";

const reducer = (state, action) => {};

const ProjectListEditor = () => {
  const dispatch = useDispatch();

  const removing = useSelector((state) => state.proj.removing);
  const editing = useSelector((state) => state.proj.editing);
  const loading = useSelector((state) => state.proj.loading);

  if (loading) {
    return null;
  }
  // const [removing, setRemoving] = useState(false);
  // const [editing, setEditing] = useState(false);
  const handleNewProjectButton = () => {
    dispatch(projActions.update({ creatingNew: true }));
  };

  const toggleRemove = () => {
    dispatch(projActions.update({ removing: !removing }));
  };

  const toggleEditing = () => {
    dispatch(projActions.update({ editing: !editing }));
  };

  if (editing) {
    return <ProjectEditor onClose={toggleEditing} />;
  }

  if (removing) {
    return <ProjectRemover onClose={toggleRemove} />;
  }

  return (
    <div className={style.editor}>
      <Button onClick={handleNewProjectButton}>New Project</Button>
      <Button onClick={toggleRemove}>Remove Projects</Button>
      <Button onClick={toggleEditing}>Edit Project</Button>
    </div>
  );
};

const ProjectRemover = (props) => {
  const dispatch = useDispatch();
  const sessionId = useSelector((state) => state.auth.sessionId);

  const selectedProjectIds = useSelector(
    (state) => state.proj.selectedProjectIds
  );
  const projects = useSelector((state) => state.proj.projects);
  useEffect(() => {
    return () => {
      dispatch(projActions.clearSelectedIds());
    };
  }, []);

  const handleCancel = () => {
    console.log(selectedProjectIds);
    props.onClose();
  };

  const handleConfirm = async () => {
    dispatch(removeSelectedProjects(selectedProjectIds, projects, sessionId));
  };

  return (
    <div className={style.editor}>
      <Button onClick={handleConfirm}>Confirm Remove</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
};

const ProjectEditor = (props) => {
  return (
    <div className={style.editor}>
      <h3>{"Click on a project to edit its properties."}</h3>
      <Button onClick={props.onClose}>Back</Button>
    </div>
  );
};

export default ProjectListEditor;
