import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aboutMeActions } from "../../store/about-me";

import Modal from "../modals/Modal";
import CardHeader from "../cards/CardHeader";
import Button from "../elements/Button";
import style from "./AboutMeEditor.module.css";

const AboutMeEditor = () => {
  const dispatch = useDispatch();

  const removingFiles = useSelector((state) => state.aboutMe.removing);

  const handleAddNewFile = () => {
    dispatch(
      aboutMeActions.update({
        editingFile: true,
        editingFileIndex: -1,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(
        aboutMeActions.update({
          editing: false,
          removing: false,
          editingFile: false,
        })
      );
    };
  }, []);

  const handleRemove = () => {
    dispatch(aboutMeActions.update({ removing: true, selectedFilesId: [] }));
  };

  if (removingFiles) {
    return <RemovingButtons dispatch={dispatch} />;
  }

  return (
    <div className={style.editor}>
      <Button onClick={handleRemove}>Remove</Button>
      <Button>Edit</Button>
      <Button onClick={handleAddNewFile}>Add New File</Button>
    </div>
  );
};

const RemovingButtons = ({ dispatch }) => {
  const selectedFilesId = useSelector((state) => state.aboutMe.selectedFilesId);
  const files = useSelector((state) => state.aboutMe.files);
  const [showConfirm, setShowConfirm] = useState(false);

  const fileNames = files
    .filter((file) => selectedFilesId.includes(file._id))
    .map((file) => file.name)
    .join(", ");

  const handleCancel = () => {
    dispatch(
      aboutMeActions.update({
        removing: false,
      })
    );
  };

  const handleRemove = () => {
    setShowConfirm(true);
  };

  const handleConfirmRemove = () => {
    setShowConfirm(false);
  };

  const confirmModal = showConfirm && (
    <Modal>
      <CardHeader
        header={<h2>Removing Files</h2>}
        className={style.confirmCard}
      >
        <p>Are you sure you want to remove {fileNames}?</p>
        <section>
          <Button onClick={handleConfirmRemove}>Confirm</Button>
          <Button
            onClick={() => {
              setShowConfirm(false);
            }}
          >
            Cancel
          </Button>
        </section>
      </CardHeader>
    </Modal>
  );

  return (
    <div className={style.editor}>
      {confirmModal}
      <Button onClick={handleRemove}>Remove Selected</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
};

export default AboutMeEditor;
