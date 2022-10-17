import style from "./ClipBoard.module.css";
import Card from "../cards/Card";
import Modal from "./Modal";
import Button from "../elements/Button";
import { useState } from "react";

const ClipBoard = (props) => {
  const { copyContent } = props;

  const copyIcon = "/resources/icons/copy.png";

  const handleClipCopy = async () => {
    await navigator.clipboard.writeText(copyContent);

    close();
  };

  const close = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <Modal onClickOut={close}>
      <Card className={style.clipBoard}>
        <div className={style.container}>
          <p>{copyContent}</p>
          <Button className={style.copyButton} onClick={handleClipCopy}>
            <img src={copyIcon} />
          </Button>
        </div>
      </Card>
    </Modal>
  );
};
export default ClipBoard;
