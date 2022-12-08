import { useDispatch, useSelector } from "react-redux";
import { useContent } from "../../../../custom-hooks/website-projects";
import { projActions } from "../../../../store/projects";
import CardHeader from "../../../cards/CardHeader";
import Modal from "../../../modals/Modal";
import TextArea from "../../../elements/TextArea";
import Button from "../../../elements/Button";
import DynamicList from "../../../dynamics/DynamicList";
import LinkInput from "../../../elements/LinkInput";

import style from "./BlogForm.module.css";
import { useState } from "react";

const BlogForm = (props) => {
  const dispatch = useDispatch();

  const [content, setContent] = useContent(true);
  const blogIndex = useSelector((state) => state.proj.editingBlogIndex);

  let currentEntry = null;

  if (blogIndex !== -1) {
    currentEntry = content.entries[blogIndex];
  }

  const [data, setData] = useState(
    currentEntry
      ? currentEntry
      : {
          text: "",
          dateCreated: "",
          links: [],
        }
  );

  const title = currentEntry ? `Editing Entry ${blogIndex + 1}` : "New Entry";

  const updateData = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData((prev) => {
      const newData = { ...prev };
      newData[id] = value;

      return newData;
    });
  };

  const handleLinkChange = (linkData) => {
    setData({ ...data, links: linkData });
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
    const entry = { ...data };

    entry.links = entry.links.filter((link) => link.name.trim() !== "");

    if (currentEntry) {
      const newEntries = [...content.entries];

      newEntries[blogIndex] = entry;

      setContent({ ...content, entries: newEntries });
    } else {
      entry.dateCreated = `${new Date()}`;

      const newEntries = content.entries
        ? [entry, ...content.entries]
        : [entry];

      setContent({ ...content, entries: newEntries });
    }
    close();
  };

  const header = <h3>{title}</h3>;
  return (
    <Modal onClickOut={close}>
      <CardHeader header={header} className={style.card}>
        <form onSubmit={handleSubmit}>
          <div className={style.inputs}>
            <TextArea
              placeholder="Entry Text"
              id="text"
              onChange={updateData}
              value={data.text}
            />
            <DynamicList
              className={style.links}
              startingValue={data.links}
              templateValue={{ name: "", link: "" }}
              onChange={handleLinkChange}
            >
              <LinkInput />
            </DynamicList>
          </div>
          <div className={style.buttons}>
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
