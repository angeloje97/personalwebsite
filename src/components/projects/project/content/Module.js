import { useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import { useContent } from "../../../../custom-hooks/website-projects";
import DynamicList from "../../../dynamics/DynamicList";
import Input from "../../../elements/Input";
import LinkInput from "../../../elements/LinkInput";
import style from "./Module.module.css";
import { useState } from "react";
import Modal from "../../../modals/Modal";
import CardHeader from "../../../cards/CardHeader";

const Module = (props) => {
  const { classtype = "", className = "" } = props;
  const finalStyle = styleGroup(style.module, classtype, className, style);
  const [showEditor, setShowEditor] = useState(false);
  const currentContent = useContent();
  const editing = useSelector((state) => state.proj.editing);

  const handleChange = (data) => {
    console.log(data);
  };

  const toggleShowEditor = () => {
    if (!editing) return;
    setShowEditor((prev) => !prev);
  };

  return (
    <div className={finalStyle} onClick={toggleShowEditor}>
      {showEditor && <ModuleEditor />}
      {currentContent.name}
    </div>
  );
};

const ModuleEditor = (props) => {
  const close = () => {
    if (props.onClose) {
      props.onClose();
    }
  };
  return (
    <Modal onClickOut={close}>
      <CardHeader></CardHeader>
    </Modal>
  );
};

export default Module;
