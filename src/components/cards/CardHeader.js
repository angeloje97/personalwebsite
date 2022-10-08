import { styleGroup } from "../../helpers/styles";
import style from "./Card.module.css";

const CardHeader = (props) => {
  const { type = "", className = "" } = props;
  const { headertype = "", headerclass = "" } = props;
  const { bodytype = "", bodyclass = "" } = props;

  const finalHeaderStyle = styleGroup(
    style.header,
    headertype,
    headerclass,
    style
  );

  const finalBodyStyle = styleGroup(style.body, bodytype, bodyclass, style);

  const finalStyle = styleGroup(style.card, type, className, style);
  return (
    <div className={finalStyle}>
      <section className={finalHeaderStyle}>{props.header}</section>
      <section className={finalBodyStyle}>{props.children}</section>
    </div>
  );
};

export default CardHeader;
