import style from "./Modal.module.css";
import { ReactPortal } from "react";

const Modal = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.background} onClick={props.onClickOut} />
      {props.children}
    </div>
  );
};

export default Modal;
