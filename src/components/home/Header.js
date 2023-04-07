import React, { useEffect, useState } from "react";
import Image from "../elements/Image.js";
import style from "./Header.module.css";
import { useSelector } from "react-redux";
import List from "../elements/List.js";
import ClipBoard from "../modals/ClipBoard.js";

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
      <Links />
    </React.Fragment>
  );
};

const Biography = (props) => {
  return <p className={style.introduction}>{biographyInfo.intro}</p>;
};

const Links = (props) => {
  const personal = useSelector((state) => state.personal);
  const [body, setBody] = useState([]);
  const [clipBoard, setClipBoard] = useState({
    isShowing: false,
    content: "",
  });

  const closeClipBoard = () => {
    setClipBoard({ ...clipBoard, isShowing: false });
  };

  useEffect(() => {
    const results = [];
    for (const prop in personal) {
      if (!personal[prop].icon) continue;
      const link = personal[prop];

      results.push(
        <li key={link.url}>
          <a href={link.url} target="_blank" rel="noreferrer">
            <Image src={`/resources/icons/${link.icon}`}></Image>
          </a>
        </li>
      );
    }

    setBody(results);
  }, []);
  return (
    <React.Fragment>
      <List className={style.linkList}>
        {body}
        <li
          onClick={() => {
            setClipBoard({ ...clipBoard, isShowing: true });
          }}
        >
          <a>
            <Image src={"/resources/icons/Email.png"}></Image>
          </a>
        </li>
      </List>
      {clipBoard.isShowing && (
        <ClipBoard copyContent={personal.email.url} onClose={closeClipBoard} />
      )}
    </React.Fragment>
  );
};

export default Header;
