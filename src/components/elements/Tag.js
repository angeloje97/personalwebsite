import style from "./Tag.module.css";

const Tag = (props) => {
  return <div className={style.tag}> {props.children}</div>;
};

export default Tag;
