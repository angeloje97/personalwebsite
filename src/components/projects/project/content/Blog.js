import { useState } from "react";
import { useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import style from "./Blog.module.css";

import Modal from "../../../modals/Modal";
import CardHeader from "../../../cards/CardHeader";

const Blog = (props) => {
  const { content, classtype = "", className = "" } = props;
  const [editinActive, setEditingActive] = useState(false);
  const editing = useSelector((state) => state.proj.editing);
  const routingData = useSelector((state) => state.proj.routingData);

  const finalStyle = styleGroup(style.blog, classtype, className, style);

  const handleClickBlog = () => {
    if (!editing) return;
    toggleEditingActive();
  };

  const toggleEditingActive = () => {
    setEditingActive((prev) => !prev);
  };

  return (
    <div className={finalStyle} onClick={handleClickBlog}>
      {content.name}
    </div>
  );
};

const BlogForm = (props) => {};

export default Blog;
