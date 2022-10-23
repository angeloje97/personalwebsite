import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../src/components/elements/Loading";
import Content from "../../src/components/projects/project/content/Content";
import ProjectOverView from "../../src/components/projects/project/overview/ProjectOverView";
import ProjectEditor from "../../src/components/projects/project/ProjectEditor";
import ProjectHeader from "../../src/components/projects/project/ProjectHeader";
import ProjectRouting from "../../src/components/projects/project/routing";
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

  const [routingData, setRoutingData] = useState({
    name: "Overview",
    sectionIndex: 0,
    contentIndex: 0,
  });

  const handleRouteChange = (newRouteData) => {
    dispatch(projActions.update({ routingData: newRouteData }));
    setRoutingData(newRouteData);
  };

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

  const content = routingData.name.toLowerCase() === "content" && (
    <Content
      sectionIndex={routingData.sectionIndex}
      contentIndex={routingData.contentIndex}
      className={style.main}
    />
  );

  return (
    <div>
      <div className={style.projectLayout}>
        <ProjectHeader className={style.header} />
        <ProjectRouting
          className={style.routing}
          onChangeRoute={handleRouteChange}
        />
        {routingData.name.toLowerCase() === "overview" && (
          <ProjectOverView className={style.main} />
        )}
        {content}
      </div>
      {isAuthenticated && <ProjectEditor />}
    </div>
  );
};

export default Project;
