import React from "react";
import style from "./HomeGrid.module.css";
import Experiences from "./Experiences.js";
import Header from "./Header";
import ProjectHighlights from "./ProjectHighlights";
import Skills from "./Skills";

const HomeGrid = (props) => {
  return (
    <React.Fragment>
      <div className={style.homeLayout}>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.body}>
          <ProjectHighlights />
        </div>
        <div className={style.side}>
          <Skills />
        </div>
        {/* <div className={style.footer}>Footer</div> */}
      </div>
    </React.Fragment>
  );
};

export default HomeGrid;
