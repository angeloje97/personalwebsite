import style from "./Modal.module.css";
import { ReactPortal } from "react";

const Modal = (props) => {
  return <div>{props.children}</div>;
};

export default Modal;
