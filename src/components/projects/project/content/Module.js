import { useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import { useContent } from "../../../../custom-hooks/website-projects";
import style from "./Module.module.css";
import { useState } from "react";
import Modal from "../../../modals/Modal";
import CardHeader from "../../../cards/CardHeader";
import ModuleForm from "./ModuleForm";
import Button from "../../../elements/Button";

const Module = (props) => {
  const { classtype = "", className = "" } = props;
  const finalStyle = styleGroup(style.module, classtype, className, style);
  const currentContent = useContent();
  const editingModule = useSelector((state) => state.proj.editingModule);
  const editing = useSelector((state) => state.proj.editing);

  const handleChange = (data) => {
    console.log(data);
  };

  return (
    <div className={finalStyle}>
      {editingModule && <ModuleForm />}
      {editing && <ModuleEditorButtons />}
    </div>
  );
};

const ModuleEditorButtons = (props) => {
  return (
    <div>
      <Button>New Module</Button>
    </div>
  );
};

export default Module;
