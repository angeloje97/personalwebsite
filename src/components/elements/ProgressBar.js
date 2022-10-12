import { styleGroup } from "../../helpers/styles";
import style from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  const { value, classtype = "", className = "" } = props;
  const finalClass = styleGroup(style.progressBar, classtype, className, style);

  const width = `${value * 100}%`;

  return (
    <div className={finalClass}>
      <span style={{ width: width }} />
      <div />
    </div>
  );
};

export default ProgressBar;
