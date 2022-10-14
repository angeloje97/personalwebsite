import style from "./ProjectEditor.module.css";
import Button from "../../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { projActions } from "../../../store/projects";
import { useEffect } from "react";
import { revertChanges, updateProject } from "../../../store/projActions";
const ProjectEditor = () => {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.proj.editing);

  const setEditor = (open = true) => {
    dispatch(projActions.update({ editing: open }));
  };

  useEffect(() => {
    return () => {
      setEditor(false);
    };
  }, []);

  if (isEditing) {
    return (
      <EditingButtons
        onClose={() => {
          setEditor(false);
        }}
      />
    );
  }

  return (
    <div className={style.editor}>
      <Button
        id="editing"
        value={true}
        onClick={() => {
          setEditor(true);
        }}
      >
        Edit
      </Button>
    </div>
  );
};

const EditingButtons = (props) => {
  const dispatch = useDispatch();

  const currentProject = useSelector((state) => state.proj.currentProject);
  const projects = useSelector((state) => state.proj.projects);
  const sessionId = useSelector((state) => state.auth.sessionId);

  const apply = () => {
    dispatch(updateProject(currentProject, projects, sessionId));
  };

  const handleRevert = () => {
    dispatch(revertChanges(currentProject._id, projects));
    props.onClose();
  };

  return (
    <div className={style.editor}>
      <Button id="editing" value={false} onClick={handleRevert}>
        Revert
      </Button>
      <Button id="editing" value={false} onClick={apply}>
        Apply
      </Button>
    </div>
  );
};

export default ProjectEditor;
