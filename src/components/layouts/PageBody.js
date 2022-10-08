import style from "./PageBody.module.css";
const PageBody = (props) => {
  return <div className={style.body}>{props.children}</div>;
};

export default PageBody;
