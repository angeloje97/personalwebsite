import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../src/components/elements/Loading";
import ProjectOverView from "../../src/components/projects/project/overview/ProjectOverView";
import ProjectEditor from "../../src/components/projects/project/ProjectEditor";
import ProjectHeader from "../../src/components/projects/project/ProjectHeader";
import ProjectRouting from "../../src/components/projects/project/ProjectRouting";
import { projActions } from "../../src/store/projects";
import style from "./ProjectsPage.module.css";

const Project = (props) => {
  const router = useRouter();
  const loading = useSelector((state) => state.proj.loading);
  const projects = useSelector((state) => state.proj.projects);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const projectId = router.query.projectId;
  const dispatch = useDispatch();

  const realProject = projects.find((proj) => proj._id === projectId);
  const currentProject = useSelector((state) => state.proj.currentProject);

  useEffect(() => {
    if (realProject) {
      dispatch(projActions.setCurrentProject({ project: { ...realProject } }));
    }
  }, [projects]);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!currentProject) {
    return <h2 className={style.error}>Could not find project</h2>;
  }

  return (
    <div>
      <div className={style.projectLayout}>
        <ProjectHeader className={style.header} />
        <ProjectRouting className={style.routing} />
        <ProjectOverView className={style.main} />
      </div>
      {isAuthenticated && <ProjectEditor />}
    </div>
  );
};

export default Project;
