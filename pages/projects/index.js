import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProjects } from "../../src/store/projActions";

import ProjectList from "../../src/components/projects/list/ProjectList";
import ProjectListEditor from "../../src/components/projects/list/ProjectListEditor";
import NewProject from "../../src/components/projects/list/NewProject";
const Projects = () => {
  const dispatch = useDispatch();
  const creatingNew = useSelector((state) => state.proj.creatingNew);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const acquireProjects = async () => {
    // dispatch(loadProjects());
  };
  useEffect(() => {
    acquireProjects();
  }, []);

  return (
    <React.Fragment>
      <ProjectList />
      {isAuthenticated && <ProjectListEditor />}
      {creatingNew && <NewProject />}
    </React.Fragment>
  );
};

export default Projects;
