import React from "react";
import style from "./HomeGrid.module.css";
import Experiences from "./Experiences.js";
import Header from "./Header";
import ProjectHighlights from "./ProjectHighlights";
import Skills from "./Skills";
import MouseToolTip from "../modals/ToolTips/MouseToolTip.js";
import References from "./References";
import { HorizontalDivider } from "../decorators/Dividers";

const HomeGrid = (props) => {
  return (
    <React.Fragment>
      <div className={style.homeLayout}>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.body}>
          <ProjectHighlights />
          <HorizontalDivider />
          <References />
        </div>
        <div className={style.side}>
          <Skills />
        </div>
        {/* <div className={style.footer}>Footer</div> */}
      </div>
      {/* <MouseToolTip offsetY={15} offsetX={15} description="Hello There" /> */}
    </React.Fragment>
  );
};

export default HomeGrid;
