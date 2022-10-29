import style from "./FileForm.module.css";

import Modal from "../../components/modals/Modal";
import CardHeader from "../../components/cards/CardHeader";
import { useDispatch, useSelector } from "react-redux";
import { aboutMeActions } from "../../store/about-me";

const FileForm = (props) => {
  const fileIndex = useSelector((state) => state.aboutMe.editingFileIndex);
  const files = useSelector((state) => state.aboutMe.files);
  const dispatch = useDispatch();

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

  const handleSubmission = (event) => {
    event.preventDefault();
  };

  return (
    <Modal onClickOut={close}>
      <CardHeader header={header} className={style.card}>
        <div className={style.body}></div>
      </CardHeader>
    </Modal>
  );
};

export default FileForm;
