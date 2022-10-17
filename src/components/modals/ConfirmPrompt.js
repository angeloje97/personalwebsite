import style from "./ConfirmPrompt.module.css";
import Modal from "./Modal";
import CardHeader from "../cards/CardHeader";
import Button from "../elements/Button";
import { styleGroup } from "../../helpers/styles";

const ConfirmPrompt = (props) => {
  const { title, message, classtype = "", className = "" } = props;

  const finalClass = styleGroup(style.prompt, classtype, className, style);
  const header = (
    <div className={style.header}>
      <h3>{title}</h3>
    </div>
  );

  const handleConfirm = () => {
    if (props.onConfirm) {
      props.onConfirm();
    }
  };

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    }
  };

  const body = (
    <div className={style.body}>
      <p>{message}</p>
      <div className={style.buttons}>
        <Button onClick={handleConfirm}>Confirm</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
  return (
    <Modal>
      <CardHeader header={header} className={finalClass}>
        {body}
      </CardHeader>
    </Modal>
  );
};

export default ConfirmPrompt;
