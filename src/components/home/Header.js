import React from "react";
import Image from "../elements/Image.js";
import style from "./Header.module.css";

const biographyInfo = {
  intro:
    "Hey there, I'm Angelo Esmeralda and I'm an aspiring software engineer from California. Welcome to my portfolio page " +
    "where you'll be able to know more about me, see all my projects, and find out what I'm up to. " +
    "Some of my favorite things to do are develop games with Unity, edit videos, play video games and randomly " +
    "pick up on some new hobbies.",
};

const Header = (props) => {
  return (
    <React.Fragment>
      <div className={style.imageContainer}>
        <Image
          src="/resources/pictures/headshot_1.jpeg"
          className={style.image}
        />
      </div>
      <Biography />
    </React.Fragment>
  );
};

const Biography = (props) => {
  return <p className={style.introduction}>{biographyInfo.intro}</p>;
};

const Links = (props) => {
  return <div></div>;
};

export default Header;
