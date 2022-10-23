import { useDispatch } from "react-redux";
import { useContent } from "../../../../custom-hooks/website-projects";
import { projActions } from "../../../../store/projects";
import CardHeader from "../../../cards/CardHeader";
import Modal from "../../../modals/Modal";
import TextArea from "../../../elements/TextArea";
import Button from "../../../elements/Button";

import style from "./BlogForm.module.css";
import { useState } from "react";

const BlogForm = (props) => {
  const dispatch = useDispatch();

  const [content, setContent] = useContent(true);
  const [data, setData] = useState({});

  const title = "New Entry";

  const updateData = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData((prev) => {
      const newData = { ...prev };
      newData[id] = value;

      return newData;
    });
  };

  const close = () => {
    dispatch(
      projActions.update({
        editingBlog: false,
        editingBlogIndex: -1,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const entry = { ...data };
    entry.dateCreated = `${new Date()}`;
    console.log(entry);

    const newEntries = content.entries ? [...content.entries, entry] : [entry];

    setContent({ ...content, entries: newEntries });
    close();
  };

  const header = <h3>{title}</h3>;
  return (
    <Modal onClickOut={close}>
      <CardHeader header={header} className={style.card}>
        <form onSubmit={handleSubmit}>
          <TextArea placeholder="Entry Text" id="text" onChange={updateData} />
          <div>
            <Button type="submit">Confirm</Button>
            <Button type="button" onClick={close}>
              Cancel
            </Button>
          </div>
        </form>
      </CardHeader>
    </Modal>
  );
};

export default BlogForm;
