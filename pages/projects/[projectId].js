import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Loading from "../../src/components/elements/Loading";
import ProjectOverView from "../../src/components/projects/project/overview/ProjectOverView";
import ProjectHeader from "../../src/components/projects/project/ProjectHeader";
import ProjectRouting from "../../src/components/projects/project/ProjectRouting";
import style from "./ProjectsPage.module.css";

const Project = (props) => {
  const router = useRouter();
  const loading = useSelector((state) => state.proj.loading);
  const projects = useSelector((state) => state.proj.projects);
  const projectId = router.query.projectId;

  const project = projects.find((proj) => proj._id === projectId);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!project) {
    return <h2 className={style.error}>Could not find project</h2>;
  }

  return (
    <div>
      <div className={style.projectLayout}>
        <ProjectHeader project={project} className={style.header} />
        <ProjectRouting project={project} className={style.routing} />
        <ProjectOverView project={project} className={style.main} />
      </div>
    </div>
  );
};

export default Project;
