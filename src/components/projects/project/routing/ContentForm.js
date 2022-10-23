import { useState } from "react";
import style from "./ContentForm.module.css";
import CardHeader from "../../../cards/CardHeader";
import Modal from "../../../modals/Modal";
import Input from "../../../elements/Input";
import Select from "../../../elements/Select";
import Button from "../../../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { projActions } from "../../../../store/projects";

const CONTENT_TYPES = ["Blog", "Module"];

const ContentForm = (props) => {
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.proj.currentProject);
  const contentIndex = useSelector((state) => state.proj.editingContentIndex);
  const sectionIndex = useSelector((state) => state.proj.editingSectionIndex);
  const section = currentProject.sections[sectionIndex];
  const content = contentIndex !== -1 ? section.contents[contentIndex] : null;

  const [contentData, setContentData] = useState(
    content || {
      name: "",
      type: "Blog",
    }
  );

  const updateData = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    setContentData((prev) => {
      const newData = { ...prev };
      newData[id] = value;

      return newData;
    });
  };
  const header = (
    <div className={style.header}>
      {content ? `Editing ${content.name}` : "New Content"}
    </div>
  );

  const options = CONTENT_TYPES.map((type) => {
    return (
      <option key={type} value={type} selected={type === contentData.type}>
        {type}
      </option>
    );
  });

  const handleSubmission = (event) => {
    event.preventDefault();

    const { name, type } = contentData;
    const updatedContents = section.contents ? [...section.contents] : [];

    if (contentIndex === -1) {
      updatedContents.push({ name, type, updated: `${new Date()}` });
    } else {
      const newContent = { ...section.contents[contentIndex] };

      newContent.name = name;
      newContent.type = type;

      for (let i = 0; i < updatedContents.length; i++) {
        if (i !== contentIndex) {
          continue;
        }

        updatedContents[i] = newContent;
      }
    }

    dispatch(
      projActions.updateCurrentProjectContent({
        newContents: updatedContents,
        sectionIndex: sectionIndex,
      })
    );

    close();
  };
  const close = () => {
    dispatch(
      projActions.update({
        editingContent: false,
        editingContentIndex: -1,
        editingContentIndex: -1,
      })
    );
  };

  return (
    <Modal onClickOut={close}>
      <CardHeader className={style.card} header={header}>
        <form className={style.form} onSubmit={handleSubmission}>
          <div className={style.inputs}>
            <Input
              id="name"
              value={contentData.name}
              onChange={updateData}
              placeholder="Content Name"
            />
            <Select id="type" value={contentData.value} onChange={updateData}>
              {options}
            </Select>
          </div>
          <div className={style.buttons}>
            <Button type="submit">Confirm</Button>
            <Button onClick={close}>Cancel</Button>
          </div>
        </form>
      </CardHeader>
    </Modal>
  );
};

export default ContentForm;
