import style from "./ProjectList.module.css";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useState } from "react";

const NewProject = (props) => {
  const [newProject, setNewProject] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = newProject.name;
    const type = newProject.type;
    const resources = newProject.resources.split(", ");

    const createdProject = { name, type, resources };

    try {
      const response = await fetch("/api/projects/new", {
        method: "POST",
        body: JSON.stringify(createdProject),
        "Content-Type": "Application/json",
      });

      const data = await response.json();

      createdProject._id = data.body.newProject.insertedId;

      props.onNewProject(createdProject);
    } catch (error) {}
  };

  const handleChange = (event) => {
    setNewProject((previous) => {
      const newData = previous;

      newData[event.target.id] = event.target.value;
      return { ...previous, ...newData };
    });
  };

  return (
    <li className={`${style.projectItem} ${style.newProject}`}>
      <form onSubmit={handleSubmit} className={style.newProjectForm}>
        <Input
          id="name"
          placeholder="Project Name"
          onChange={handleChange}
          inputtype="stretch"
        />
        <Input
          id="type"
          placeholder="Type"
          onChange={handleChange}
          inputtype="stretch"
        ></Input>
        <Input
          inputtype="stretch"
          type="multiline"
          id="resources"
          placeholder="Tags: t1, t2, t3"
          onChange={handleChange}
        />
        <Button type="submit" classtype="symbol">
          +
        </Button>
      </form>
    </li>
  );
};

export default NewProject;
