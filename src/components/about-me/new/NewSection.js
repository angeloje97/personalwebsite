import style from "./NewSection.module.css";
import Modal from "../../modals/Modal";
import CardHeader from "../../cards/CardHeader";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import { clamp } from "../../../helpers/mathH";
import React, { useState } from "react";

const NewSection = ({}) => {
  const [creating, setCreating] = useState(false);
  const handleAddNewSection = () => {
    setCreating(true);
  };

  const closeForm = () => {
    console.log("Closing form");
    setCreating(false);
  };

  return (
    <React.Fragment>
      <div className={style.container} onClick={handleAddNewSection}>
        <h1 className={style.add}>+</h1>
      </div>
      {creating && <NewSectionForm onClose={closeForm} />}
    </React.Fragment>
  );
};

const NewSectionForm = ({ onClose }) => {
  const [contentCount, setContentCount] = useState(1);

  const handleContentChange = (event) => {
    const value = event.target.value;
    const numValue = parseInt(value);

    setContentCount(numValue);
  };

  const handleBlur = () => {
    setContentCount((prev) => clamp(prev, 1, 3));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Modal>
      <CardHeader
        header={<h3>Pick Content Count (1-3)</h3>}
        className={style.card}
      >
        <form className={style.form} onSubmit={handleSubmit}>
          <Input
            value={contentCount}
            onChange={handleContentChange}
            placeholder="(1-3)"
            onBlur={handleBlur}
            type="number"
          ></Input>
          <div>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </CardHeader>
    </Modal>
  );
};

export default NewSection;
