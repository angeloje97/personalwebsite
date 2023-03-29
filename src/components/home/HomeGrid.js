import React from "react";
import style from "./HomeGrid.module.css";

import Header from "./Header";

const HomeGrid = (props) => {
  return (
    <React.Fragment>
      <div className={style.homeLayout}>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.body}>Body</div>
        <div className={style.side}>Side</div>
        <div className={style.footer}>Footer</div>
      </div>
    </React.Fragment>
  );
};

export default HomeGrid;
