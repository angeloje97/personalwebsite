import { useSelector } from "react-redux";
import NewSection from "./new/NewSection";
import style from "./File.module.css";

const File = ({}) => {
  const currentFile = useSelector((state) => state.aboutMe.currentFile);
  const editingFile = useSelector((state) => state.aboutMe.editingFile);

  return <div className={style.file}>{editingFile && <NewSection />}</div>;
};

export default File;
