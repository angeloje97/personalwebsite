import React from "react";
import ReactPlayer from "react-player";
import { styleGroup } from "../../helpers/styles";
import style from "./InterpretedText.module.css";

const InterpretedText = (props) => {
  const { text, fallback = "No Text", classtype = "", className = "" } = props;
  const finalClass = styleGroup(style.interpreted, classtype, className, style);

  if (!text) {
    return <p className={finalClass}>{fallback}</p>;
  }
  const sections = text.split("\\");
  let results = [];
  let index = 0;
  for (const section of sections) {
    index++;
    if (section.trim() === "") continue;

    let currentCharacter = 0;
    let type = "";

    for (let i = 0; i < section.length; i++) {
      currentCharacter++;
      if (section[i] === " ") break;
      type += section[i];
    }

    const content = section.slice(currentCharacter, section.length);

    if (type === "link") {
      const linkContent = content.split(":");
      const linkName = linkContent[0];
      const linkUrl = linkContent[1];
      results.push(
        <a
          href={linkUrl}
          className={style.link}
          target="_blank"
          rel="noreferrer"
        >
          {linkName}
        </a>
      );
      continue;
    }

    if (type === "img") {
      results.push(<img src={content} key={index} />);
      continue;
    }

    if (type === "video") {
      results.push(
        <div key={index}>
          <ReactPlayer controls url={content} />
        </div>
      );
      continue;
    }

    const CustomTag = type;

    results.push(
      <CustomTag key={index} {...props}>
        {" "}
        {content}
      </CustomTag>
    );
  }

  return <div className={finalClass}>{results}</div>;
};

export default InterpretedText;
