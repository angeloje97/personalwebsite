import style from "./Modal.module.css";
import React, { ReactPortal } from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className={style.background} onClick={props.onClickOut}></div>,
        portalElement
      )}

      {ReactDOM.createPortal(
        <div className={style.modal}>{props.children}</div>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
