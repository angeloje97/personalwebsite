import { useSelector, useDispatch } from "react-redux";
import { projActions } from "../../../store/projects";
import { useState } from "react";
import { addNewProject, updateProject } from "../../../store/projActions";
import Modal from "../../modals/Modal";
import CardHeader from "../../cards/CardHeader";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import style from "./NewProject.module.css";

const NewProject = ({ editing, onClose, label = "New Project" }) => {
  const dispatch = useDispatch();

  const tagsJoined = editing ? editing.tags.join(", ") : "";

  const [data, setData] = useState({
    name: editing ? editing.name : "",
    type: editing ? editing.type : "",
    tags: tagsJoined,
  });

  const updateData = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    setData((prev) => {
      const newData = { ...prev };
      newData[id] = value;

      return newData;
    });
  };

  const currentProjects = useSelector((state) => state.proj.projects);
  const sessionId = useSelector((state) => state.auth.sessionId);

  const close = () => {
    if (onClose) {
      onClose();
    }

    if (editing) {
      return;
    }
    dispatch(projActions.update({ creatingNew: false }));
  };

  const handleCancel = (event) => {
    event.preventDefault();

    close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, type, tags } = data;

    if (name.trim() === "") return;
    if (type.trim() === "") return;
    const createdProject = {
      name,
      type,
      tags: tags.split(", "),
    };
    if (editing) {
      if (
        editing.name === name &&
        editing.type === type &&
        editing.tags === tags.split(", ")
      ) {
        return;
      }
      const updatedProject = { ...editing, name, type, tags: tags.split(", ") };

      dispatch(updateProject(updatedProject, currentProjects, sessionId));
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
            onChange={updateData}
            id="name"
            value={data.name}
          />
          <Input
            placeholder="Type"
            onChange={updateData}
            id="type"
            value={data.type}
          />
          <Input
            placeholder="Tags"
            onChange={updateData}
            id="tags"
            value={data.tags}
          ></Input>
          {buttons}
        </form>
      </CardHeader>
    </Modal>
  );
};

export default NewProject;
