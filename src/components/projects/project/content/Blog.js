import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styleGroup } from "../../../../helpers/styles";
import { useContent } from "../../../../custom-hooks/website-projects";
import style from "./Blog.module.css";

import InterpretedText from "../../../dynamics/InterpretedText";
import Button from "../../../elements/Button";
import BlogForm from "./BlogForm";
import { projActions } from "../../../../store/projects";
import List from "../../../elements/List";
import { formattedDate } from "../../../../helpers/stringHelper";
import Icon from "../../../elements/Icon";

const Blog = (props) => {
  const { classtype = "", className = "" } = props;
  const editing = useSelector((state) => state.proj.editing);
  const editingBlog = useSelector((state) => state.proj.editingBlog);

  const content = useContent();

  const entries = content.entries ? content.entries : [];
  const finalStyle = styleGroup(style.blog, classtype, className, style);

  return (
    <div className={finalStyle}>
      {editing && <BlogEditorButtons />}
      {editingBlog && <BlogForm />}
      <Entries entries={entries} editing={editing} />
    </div>
  );
};

const Entries = ({ entries, editing }) => {
  const entryContent = entries.map((entry, index) => {
    const date = formattedDate(new Date(entry.dateCreated));

    const divider = index > 0 ? <div className={style.entryDivider} /> : null;
    return (
      <li key={index} className={style.entry}>
        {divider}
        {editing && <EntryEditorButtons entryIndex={index} />}
        <h4 className={style.dateCreated}>{date}</h4>
        <InterpretedText text={entry.text} />
      </li>
    );
  });

  return <List className={style.entryList}>{entryContent}</List>;
};

const BlogEditorButtons = () => {
  const dispatch = useDispatch();

  const handleNewBlog = () => {
    dispatch(projActions.update({ editingBlog: true }));
  };

  return (
    <div className={style.editorButtons}>
      <Button onClick={handleNewBlog}>New Blog</Button>
    </div>
  );
};

const EntryEditorButtons = ({ entryIndex }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useContent(true);

  const handleEdit = () => {
    dispatch(
      projActions.update({ editingBlog: true, editingBlogIndex: entryIndex })
    );
  };

  const handleDelete = () => {
    setContent({
      ...content,
      entries: content.entries.filter((entry, index) => index !== entryIndex),
    });
  };

  return (
    <div className={style.entryButtons}>
      <Button onClick={handleEdit}>
        <Icon icon="edit" />
      </Button>
      <Button onClick={handleDelete}>
        <Icon icon="trash" />
      </Button>
    </div>
  );
};

export default Blog;
