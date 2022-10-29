import { useDispatch } from "react-redux";
import { aboutMeActions } from "../../store/about-me";
import Button from "../elements/Button";
import style from "./AboutMeEditor.module.css";

const AboutMeEditor = () => {
  const dispatch = useDispatch();

  const handleAddNewFile = () => {
    dispatch(
      aboutMeActions.update({
        editingFile: true,
        editingFileIndex: -1,
      })
    );
  };

  return (
    <div className={style.editor}>
      <Button>Edit</Button>
      <Button onClick={handleAddNewFile}>Add New File</Button>
    </div>
  );
};

export default AboutMeEditor;
