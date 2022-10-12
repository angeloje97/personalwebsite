import style from "./ProjectEditor.module.css";
import Button from "../../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { projActions } from "../../../store/projects";
import { useEffect } from "react";
import { Delay } from "../../../helpers/Task";
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
  const apply = async () => {
    props.onClose();
  };
  return (
    <div className={style.editor}>
      <Button id="editing" value={false} onClick={props.onClose}>
        Revert
      </Button>
      <Button id="editing" value={false} onClick={apply}>
        Apply
      </Button>
    </div>
  );
};

export default ProjectEditor;
