import style from "./FileForm.module.css";
import Modal from "../../components/modals/Modal";
import Input from "../../components/elements/Input";
import CardHeader from "../../components/cards/CardHeader";
import Button from "../../components/elements/Button";

import { useDispatch, useSelector } from "react-redux";
import aboutMe, { aboutMeActions } from "../../store/about-me";
import { addFile } from "../../store/aboutMeActions";

import { useState } from "react";

const FileForm = (props) => {
  const fileIndex = useSelector((state) => state.aboutMe.editingFileIndex);
  const files = useSelector((state) => state.aboutMe.files);
  const sessionId = useSelector((state) => state.auth.sessionId);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
  });

  const title =
    fileIndex !== -1 ? `Editing ${files[fileIndex].name}` : "Creating New File";

  const header = (
    <header>
      <h3>{title}</h3>
    </header>
  );

  const close = () => {
    dispatch(
      aboutMeActions.update({
        editingFile: false,
        editingFileIndex: -1,
      })
    );
  };
  const updateName = (event) => {
    setData({ ...data, name: event.target.value });
  };

  const handleSubmission = (event) => {
    event.preventDefault();

    dispatch(addFile(data, files, sessionId));
  };

  return (
    <Modal onClickOut={close}>
      <CardHeader header={header} className={style.card}>
        <form onSubmit={handleSubmission} className={style.body}>
          <Input
            placeholder="File Name"
            onChange={updateName}
            value={data.name}
          />
          <div className={style.formButtons}>
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

export default FileForm;
