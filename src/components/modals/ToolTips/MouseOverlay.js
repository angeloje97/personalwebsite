import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import style from "./MouseOverlay.module.css";
import Portal from "../../elements/Portal.js";
import { styleGroup } from "../../../helpers/styles";

const MouseToolTip = ({
  children,
  offsetX,
  offsetY,
  className = "",
  classType = "",
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [anchor, setAnchor] = useState("topRight");
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setShowOverlay(true);
    };
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const finalStyle = styleGroup(
    style.mouseOverlay,
    classType,
    className,
    style
  );

  useEffect(() => {
    let result = "";

    result += position.y < window.innerHeight / 2 ? "top" : "bottom";
    result += position.x < window.innerWidth / 2 ? "Right" : "Left";

    setAnchor(result);
  }, [position]);

  const positionStyle = {};

  switch (anchor) {
    case "topRight":
      positionStyle.top = position.y + offsetY + "px";
      positionStyle.left = position.x + offsetX + "px";
      break;
    case "bottomRight":
      positionStyle.bottom = window.innerHeight + offsetY - position.y + "px";
      positionStyle.left = position.x + offsetX + "px";
      break;
    case "bottomLeft":
      positionStyle.bottom = window.innerHeight - position.y + offsetY + "px";
      positionStyle.right = window.innerWidth - position.x + +offsetX + "px";
      break;
    case "topLeft":
      positionStyle.top = position.y + offsetY + "px";
      positionStyle.right = window.innerWidth - position.x + offsetX + "px";
      break;
    default:
      break;
  }

  if (!showOverlay) return null;

  return (
    <div style={positionStyle} className={finalStyle}>
      {children}
    </div>
  );
};

export default MouseToolTip;
