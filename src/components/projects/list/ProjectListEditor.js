import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import Button from "../../elements/Button";
import style from "./ProjectListEditor.module.css";
import { projActions } from "../../../store/projects";
import { removeSelectedProjects } from "../../../store/projActions";
import CardHeader from "../../cards/CardHeader";
import Modal from "../../modals/Modal";

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

  const handleClick = (event) => {
    const updated = {};
    updated[event.target.id] = event.target.value;

    dispatch(projActions.update(updated));
  };

  return (
    <div className={style.editor}>
      <Button onClick={handleClick} id="creatingNew" value={true}>
        New Project
      </Button>
      <Button onClick={handleClick} id="removing" value={true}>
        Remove Projects
      </Button>
      <Button onClick={handleClick} id="editing" value={true}>
        Edit Project
      </Button>
    </div>
  );
};

const ProjectRemover = (props) => {
  const dispatch = useDispatch();
  const sessionId = useSelector((state) => state.auth.sessionId);
  const [showConfirm, setShowConfirm] = useState(false);

  const selectedProjectIds = useSelector(
    (state) => state.proj.selectedProjectIds
  );
  const projects = useSelector((state) => state.proj.projects);

  const selectedProjectNames = projects
    .filter((project) => selectedProjectIds.includes(project._id))
    .map((project) => project.name)
    .join(", ");

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

  const closeModal = () => {
    setShowConfirm(false);
  };

  const confirmModal = showConfirm && (
    <Modal onClickOut={closeModal}>
      <CardHeader
        header={<h2>Confirm Remove Projects</h2>}
        className={style.confirmCard}
      >
        <p>Are you sure you want to remove {selectedProjectNames}?</p>
        <section>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </section>
      </CardHeader>
    </Modal>
  );

  return (
    <div className={style.editor}>
      {confirmModal}
      <Button
        onClick={() => {
          setShowConfirm(true);
        }}
      >
        Remove Selected
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
};

const ProjectEditor = (props) => {
  return (
    <div className={style.editor}>
      <h3>Click on a project to edit its properties.</h3>
      <Button onClick={props.onClose}>Back</Button>
    </div>
  );
};

export default ProjectListEditor;
