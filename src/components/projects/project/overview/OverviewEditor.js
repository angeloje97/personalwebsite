import { useSelector } from "react-redux";
import style from "./OverviewEditor.module.css";

const OverviewEditor = () => {
  const currenProject = useSelector((state) => state.proj.currentProj);
  return <div></div>;
};

export default OverviewEditor;
