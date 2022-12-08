import { useSelector } from "react-redux";
import NewSection from "./new/NewSection";
import style from "./File.module.css";

const File = ({}) => {
  const currentFile = useSelector((state) => state.aboutMe.currentFile);

  return (
    <div className={style.file}>
      <NewSection />
    </div>
  );
};

export default File;
