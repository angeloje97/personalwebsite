import { styleGroup } from "../../../../helpers/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { projActions } from "../../../../store/projects";
import InnerShadow from "../../../elements/InnerShadow";

import style from "./ProjectOverView.module.css";
import OverviewEditor from "./OverviewEditor";
import DynamicMedia from "../../../dynamics/DynamicMedia";
import InterpretedText from "../../../dynamics/InterpretedText";

const ProjectOverView = (props) => {
  const { classtype = "", className = "" } = props;

  const editing = useSelector((state) => state.proj.editing);
  const project = useSelector((state) => state.proj.currentProject);
  const dispatch = useDispatch();

  const overview = project.overview || {
    media: {},
  };
  const links = overview.links ? (
    overview.links.map((link) => <a href={link.url}>{link.name}</a>)
  ) : (
    <a>No Links</a>
  );

  const [showEditor, setShowEditor] = useState(false);

  const firstStyle = editing
    ? `${style.overview} ${style.editing}`
    : style.overview;

  const finalClass = styleGroup(firstStyle, classtype, className, style);
  const handleOverviewClick = () => {
    if (!editing) return;
    setShowEditor(true);
  };

  const handleClickOut = () => {
    setShowEditor(false);
  };

  const video = overview.media.link ? (
    <div className={style.video}>
      <DynamicMedia
        controls
        url={overview.media.link}
        src={overview.media.link}
        mediatype={overview.media.type}
      />
    </div>
  ) : null;

  const handleSubmitOverview = (overviewData) => {
    const updatedProject = { ...project };
    updatedProject.overview = overviewData;

    dispatch(projActions.setCurrentProject({ project: updatedProject }));
  };

  return (
    <div className={finalClass}>
      <InnerShadow />
      {showEditor && (
        <OverviewEditor
          onClickOut={handleClickOut}
          onSubmit={handleSubmitOverview}
        />
      )}
      <div className={style.content} onClick={handleOverviewClick}>
        <div className={style.header}>
          <h2>{overview.title || "No Overview Title"}</h2>
        </div>
        {video}
        <div className={style.link}>{links}</div>
        <div>
          <InterpretedText
            fallback="No Project Description"
            text={overview.description}
            className={style.description}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectOverView;
