import style from "./Card.module.css";
import { styleGroup } from "../../helpers/styles";
const Card = (props) => {
  const { type = "", className = "" } = props;

  const finalStyle = styleGroup(style.card, type, className, style);

  return (
    <div {...props} className={finalStyle}>
      {props.children}
    </div>
  );
};

export default Card;
