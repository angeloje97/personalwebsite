import React from "react";

import ProjectItem from "./ProjectItem";
import { useRouter } from "next/router";
import List from "../../elements/List";
import style from "./ProjectList.module.css";
import Loading from "../../elements/Loading";
import { useSelector } from "react-redux";

const ProjectList = () => {
  const router = useRouter();

  const isLoading = useSelector((state) => state.proj.loading);
  const projects = useSelector((state) => state.proj.projects);

  const handleSelectProject = (project) => {
    router.push(`/projects/select?id=${project._id}`);
  };

  const projectsContent = projects.map((project) => (
    <ProjectItem
      project={project}
      key={project._id}
      onSelect={handleSelectProject}
    />
  ));

  if (isLoading) {
    return <Loading />;
  }
  return <List className={`${style.projectList}`}>{projectsContent}</List>;
};

export default ProjectList;
