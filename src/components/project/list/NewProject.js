import { useSelector, useDispatch } from "react-redux";
import { projActions } from "../../../store/projects";
import { useState } from "react";
import { addNewProject } from "../../../store/projActions";
import Modal from "../../modals/Modal";
import CardHeader from "../../cards/CardHeader";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import style from "./NewProject.module.css";

const NewProject = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");

  const currentProjects = useSelector((state) => state.proj.projects);
  const sessionId = useSelector((state) => state.auth.sessionId);

  const headerContent = <div className={style.header}>New Project</div>;
  const close = () => {
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
    dispatch(addNewProject(createdProject, currentProjects, sessionId));
    close();
  };

  const buttons = (
    <div className={style.buttons}>
      <Button type="submit">Create New Project</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );

  return (
    <Modal>
      <CardHeader header={headerContent} className={style.card}>
        <form className={style.body} onSubmit={handleSubmit}>
          <Input
            placeholder="Project Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <Input
            placeholder="Type"
            onChange={(event) => {
              setType(event.target.value);
            }}
          />
          <Input
            placeholder="Tags"
            onChange={(event) => {
              setTags(event.target.value);
            }}
          ></Input>
          {buttons}
        </form>
      </CardHeader>
    </Modal>
  );
};

export default NewProject;
