import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import aboutMe, { aboutMeActions } from "../../store/about-me";
import { removeFiles } from "../../store/aboutMeActions";

import Modal from "../modals/Modal";
import CardHeader from "../cards/CardHeader";
import Button from "../elements/Button";
import style from "./AboutMeEditor.module.css";

const AboutMeEditor = () => {
  const dispatch = useDispatch();

  const removingFiles = useSelector((state) => state.aboutMe.removing);
  const editingFile = useSelector((state) => state.editingFile);
  const editingFileNames = useSelector(
    (state) => state.aboutMe.editingFileNames
  );

  const currentFile = useSelector((state) => state.aboutMe.currentFile);

  const handleAddNewFile = () => {
    dispatch(
      aboutMeActions.update({
        editingFileName: true,
        editingFileIndex: -1,
      })
    );
  };

  const handleEditFileName = () => {
    dispatch(
      aboutMeActions.update({
        editingFileNames: true,
      })
    );
  };

  const editCurrentFile = () => {
    dispatch(
      aboutMeActions.update({
        editingFile: true,
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
          editingFileName: false,
          editingFileNames: false,
        })
      );
    };
  }, [dispatch]);

  const handleRemove = () => {
    dispatch(aboutMeActions.update({ removing: true, selectedFilesId: [] }));
  };

  if (editingFile) {
    return <EditingCurrentFileButtons dispatch={dispatch} />;
  }

  if (removingFiles) {
    return <RemovingButtons dispatch={dispatch} />;
  }

  if (editingFileNames) {
    return <EditingFileNameButtons dispatch={dispatch} />;
  }

  const editSelectedButton = currentFile.name ? (
    <Button onClick={editCurrentFile}>Edit {currentFile.name}</Button>
  ) : null;
  return (
    <div className={style.editor}>
      {editSelectedButton}
      <Button onClick={handleRemove}>Remove Files</Button>
      <Button onClick={handleEditFileName}>Edit File Names</Button>
      <Button onClick={handleAddNewFile}>Add New File</Button>
    </div>
  );
};

const EditingFileNameButtons = ({ dispatch }) => {
  const handleBack = () => {
    dispatch(aboutMeActions.update({ editingFileNames: false }));
  };
  return (
    <div className={style.editor}>
      <Button onClick={handleBack}>Back</Button>
    </div>
  );
};

const EditingCurrentFileButtons = ({ dispatch }) => {
  return (
    <div classname={style.editor}>
      <Button>Confirm Changes</Button>
      <Button>Revert</Button>
    </div>
  );
};

const RemovingButtons = ({ dispatch }) => {
  const selectedFilesId = useSelector((state) => state.aboutMe.selectedFilesId);
  const files = useSelector((state) => state.aboutMe.files);
  const sessionId = useSelector((state) => state.auth.sessionId);
  const sendingFetch = useSelector((state) => state.aboutMe.sendingFetch);
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
    dispatch(removeFiles(selectedFilesId, files, sessionId));
  };

  const confirmModal = showConfirm && (
    <Modal>
      <CardHeader
        header={<h2>Removing Files</h2>}
        className={style.confirmCard}
      >
        <p>Are you sure you want to remove {fileNames}?</p>
        {!sendingFetch && (
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
        )}
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
