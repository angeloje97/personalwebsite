import { styleGroup } from "../../helpers/styles";
import style from "./List.module.css";

const List = (props) => {
  const { listtype = "", className = "" } = props;
  const finalClass = styleGroup(style.list, listtype, className, style);
  return <ul className={finalClass}>{props.children}</ul>;
};

export default List;
