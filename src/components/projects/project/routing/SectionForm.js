import { useState } from "react";
import style from "./SectionForm.module.css";
import Modal from "../../../modals/Modal";
import CardHeader from "../../../cards/CardHeader";
import Button from "../../../elements/Button";
import Input from "../../../elements/Input";
import { styleGroup } from "../../../../helpers/styles";
import { useDispatch, useSelector } from "react-redux";
import { projActions } from "../../../../store/projects";

const SectionForm = (props) => {
  const currentProject = useSelector((state) => state.proj.currentProject);
  const sectionIndex = useSelector((state) => state.proj.editingSectionIndex);
  const section =
    sectionIndex !== -1 ? currentProject.sections[sectionIndex] : null;

  const dispatch = useDispatch();

  const [sectionData, setSectionData] = useState(
    section ? section : { name: "" }
  );

  const handleChangeInput = (event) => {
    setSectionData((prev) => {
      const newData = { ...sectionData };
      newData.name = event.target.value;
      return newData;
    });
  };
  const close = () => {
    dispatch(
      projActions.update({ editingSection: false, editingSectionIndex: -1 })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const sections = currentProject.sections
      ? [...currentProject.sections]
      : [];

    const editedProject = { ...currentProject };

    if (section) {
      const updatedSections = [];

      for (let i = 0; i < sections.length; i++) {
        if (i === sectionIndex) {
          updatedSections.push({ ...section, name: sectionData.name });
          continue;
        }
        updatedSections.push(sections[i]);
      }

      editedProject.sections = updatedSections;
    } else {
      sections.push({
        name: sectionData.name,
        contents: [],
        updated: `${new Date()}`,
      });
      editedProject.sections = sections;
    }

    dispatch(projActions.setCurrentProject({ project: editedProject }));
    close();
  };

  const header = (
    <div className={style.header}>
      <h3>{section ? `Editing ${section.name}` : "New Section Name"}</h3>
    </div>
  );

  const buttons = (
    <div className={style.buttons}>
      <Button type="submit">Confirm</Button>
      <Button onClick={close}>Cancel</Button>
    </div>
  );

  return (
    <Modal onClickOut={close}>
      <CardHeader header={header} className={style.sectionForm}>
        <form className={style.form} onSubmit={handleSubmit}>
          <Input
            type="name"
            placeholder="Section Name"
            value={sectionData.name}
            onChange={handleChangeInput}
          />
          {buttons}
        </form>
      </CardHeader>
    </Modal>
  );
};

export default SectionForm;
