import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aboutMeActions } from "../../store/about-me";
import Button from "../elements/Button";
import style from "./AboutMeEditor.module.css";

const AboutMeEditor = () => {
  const dispatch = useDispatch();

  const removingFiles = useSelector((state) => state.aboutMe.removing);

  const handleAddNewFile = () => {
    dispatch(
      aboutMeActions.update({
        editingFile: true,
        editingFileIndex: -1,
      })
    );
  };

  const handleRemove = () => {
    dispatch(aboutMeActions.update({ removing: true }));
  };

  return (
    <div className={style.editor}>
      <Button onClick={handleRemove}>Remove</Button>
      <Button>Edit</Button>
      <Button onClick={handleAddNewFile}>Add New File</Button>
    </div>
  );
};

export default AboutMeEditor;
