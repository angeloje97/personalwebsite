import React, { useEffect, useState } from "react";
import Image from "../elements/Image";
import ReactDOM from "react-dom";
import style from "./WebpageBackground.module.css";

const WebpageBackground = ({ src }) => {
  return (
    <React.Fragment>
      <Image src={src} className={style.image} />
    </React.Fragment>
  );
};

export default WebpageBackground;
