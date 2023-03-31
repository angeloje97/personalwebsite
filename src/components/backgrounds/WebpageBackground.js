import React, { useEffect, useState } from "react";
import Image from "../elements/Image";
import ReactDOM from "react-dom";
import style from "./WebpageBackground.module.css";
import { useRouter } from "next/router";

const backgroundSet = {
  "/projects": "/resources/pictures/Background1.png",
  "/resume": "/resources/pictures/Background2.jpg",
};

const WebpageBackground = () => {
  const [imgSrc, setImgSrc] = useState("/resources/pictures/Background1.png");
  const router = useRouter();

  useEffect(() => {
    for (const path in backgroundSet) {
      if (router.pathname.startsWith(path)) {
        setImgSrc(backgroundSet[path]);
        return;
      }
    }

    setImgSrc("resources/pictures/Background3.jpeg");
  }, [router.pathname]);

  return (
    <React.Fragment>
      <Image className={style.image} src={imgSrc} />
    </React.Fragment>
  );
};

export default WebpageBackground;
