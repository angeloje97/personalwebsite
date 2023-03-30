import React, { useEffect, useState } from "react";
import Image from "../elements/Image";
import ReactDOM from "react-dom";
import style from "./WebpageBackground.module.css";

const WebpageBackground = ({ src }) => {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const element = document.getElementById("backgrounds");

    setBackground(
      ReactDOM.createPortal(
        <Image src={src} className={style.image} />,
        element
      )
    );
  }, []);

  return <React.Fragment>{background}</React.Fragment>;
};

export default WebpageBackground;
