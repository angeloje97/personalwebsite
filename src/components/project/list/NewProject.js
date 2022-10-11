import { useSelector, useDispatch } from "react-redux";
import { projActions } from "../../../store/projects";
import { useState } from "react";
import { addNewProject } from "../../../store/projActions";
import Modal from "../../modals/Modal";
import CardHeader from "../../cards/CardHeader";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import style from "./NewProject.module.css";

const NewProject = ({ editing, onClose, label = "New Project" }) => {
  const dispatch = useDispatch();

  const tagsJoined = editing ? editing.tags.join(", ") : "";
  const [name, setName] = useState(editing ? editing.name : "");
  const [type, setType] = useState(editing ? editing.type : "");
  const [tags, setTags] = useState(tagsJoined);

  const currentProjects = useSelector((state) => state.proj.projects);
  const sessionId = useSelector((state) => state.auth.sessionId);

  const close = () => {
    if (onClose) {
      onClose();
    }

    if (editing) {
      return;
    }
    dispatch(projActions.setCreatingNewProject({ createNew: false }));
  };

  const handleCancel = (event) => {
    event.preventDefault();

    close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.trim() === "") return;
    if (type.trim() === "") return;
    const createdProject = {
      name,
      type,
      tags,
    };
    if (editing) {
    } else {
      dispatch(addNewProject(createdProject, currentProjects, sessionId));
    }
  };

  const headerContent = <div className={style.header}>{label}</div>;
  const buttons = (
    <div className={style.buttons}>
      <Button type="submit">
        {editing ? "Update Project" : "Create New Project"}
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );

  return (
    <Modal onClickOut={handleCancel}>
      <CardHeader header={headerContent} className={style.card}>
        <form className={style.body} onSubmit={handleSubmit}>
          <Input
            placeholder="Project Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
          />
          <Input
            placeholder="Type"
            onChange={(event) => {
              setType(event.target.value);
            }}
            value={type}
          />
          <Input
            placeholder="Tags"
            onChange={(event) => {
              setTags(event.target.value);
            }}
            value={tags}
          ></Input>
          {buttons}
        </form>
      </CardHeader>
    </Modal>
  );
};

export default NewProject;
