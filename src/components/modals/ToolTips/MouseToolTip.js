import style from "./MouseToolTip.module.css";
import MouseOverlay from "./MouseOverlay.js";
const MouseToolTip = ({ description, ...props }) => {
  console.log(description);
  return (
    <MouseOverlay className={style.toolTip} {...props}>
      <p>{description}</p>
    </MouseOverlay>
  );
};

export default MouseToolTip;
