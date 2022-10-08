import React, { useEffect, useState } from "react";
import List from "../elements/List";
import Tag from "../elements/Tag";
import style from "./ProjectList.module.css";
import { useRouter } from "next/router";
import Button from "../elements/Button";
import NewProject from "./NewProject";
import { useSelector } from "react-redux";
import Loading from "../elements/Loading";

const projectsTemplate = [
  {
    name: "Architome",
    id: 1,
  },
];

const ProjectList = (props) => {
  const [projects, setProjects] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [creatingNew, setCreatingNew] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/projects");

      const data = await response.json();
      const fetchedProjects = data.body.projects;

      setProjects(fetchedProjects);
    } catch (error) {
      console.log(error.message);
      setProjects(projectsTemplate);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectProject = (project) => {
    router.push(`/projects/${project._id}`);
  };

  const projectsContent = projects.map((project) => (
    <ProjectItem
      project={project}
      key={project._id}
      onSelect={handleSelectProject}
    />
  ));

  const openNewProject = () => {
    setCreatingNew(true);
  };

  const closeNewProject = () => {
    setCreatingNew(false);
  };

  const handleNewProject = (newProject) => {
    console.log(newProject);
    setProjects((prev) => {
      return [...prev, newProject];
    });

    closeNewProject();
  };

  const newProjectButton = !isAuthenticated ? null : creatingNew ? null : (
    <Button className={style.newProjectButton} onClick={openNewProject}>
      New Project
    </Button>
  );

  const cancelProjectButton = !creatingNew ? null : (
    <Button onClick={closeNewProject} className={style.newProjectButton}>
      Cancel
    </Button>
  );

  const newProjectForm = !creatingNew ? null : (
    <NewProject onNewProject={handleNewProject} />
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <List className={`${style.projectList}`}>
      {projectsContent}
      {newProjectForm}
      {cancelProjectButton}
      {newProjectButton}
    </List>
  );
};

const ProjectItem = (props) => {
  const { project } = props;

  const resources = project.resources.map((resource) => (
    <Tag key={resource}>{resource}</Tag>
  ));

  const handleSelectItem = () => {
    props.onSelect(project);
  };

  return (
    <li
      className={`${style.projectItem} ${style.existingProject}`}
      onClick={handleSelectItem}
      value={project}
    >
      <h3>{project.name}</h3>
      <p>{project.type}</p>
      <div className={style.tags}>{resources}</div>
    </li>
  );
};

export default ProjectList;
