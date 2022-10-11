import React, { useEffect } from "react";
import ProjectList from "../../src/components/project/list/ProjectList";
import { projActions } from "../../src/store/projects";
import { useDispatch, useSelector } from "react-redux";
import ProjectListEditor from "../../src/components/project/list/ProjectListEditor";
import NewProject from "../../src/components/project/list/NewProject";
const Projects = () => {
  const dispatch = useDispatch();
  const creatingNew = useSelector((state) => state.proj.creatingNew);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const acquireProjects = async () => {
    dispatch(projActions.updateLoading({ loading: true }));
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      const fetchedProjects = data.body.projects;

      dispatch(projActions.setProjects({ projects: fetchedProjects }));
    } catch (error) {}
    dispatch(projActions.updateLoading({ loading: false }));
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
