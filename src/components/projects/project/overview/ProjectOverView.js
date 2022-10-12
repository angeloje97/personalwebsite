import { styleGroup } from "../../../../helpers/styles";
import InnerShadow from "../../../elements/InnerShadow";

import style from "./ProjectOverView.module.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const ProjectOverView = (props) => {
  const { classtype = "", className = "" } = props;
  const finalClass = styleGroup(style.overview, classtype, className, style);

  const project = useSelector((state) => state.proj.currentProject);

  const video = project.mainVideo ? (
    <div className={style.video}>
      <ReactPlayer controls url={project.mainVideo} />
    </div>
  ) : (
    <h3 className={style.noVideo}>No Video</h3>
  );

  return (
    <div className={finalClass}>
      <InnerShadow />
      <div className={style.header}>
        <h2>{project.overview || "No Overview Title"}</h2>
      </div>
      {video}
      <div className={style.link}>
        <a>Links</a>
      </div>
      <div className={style.description}>
        <p>{project.description || "No Description"}</p>
      </div>
    </div>
  );
};

export default ProjectOverView;
