import { useContent } from "../../../../custom-hooks/website-projects";
import style from "./ModuleForm.module.css";

import CardHeader from "../../../cards/CardHeader";
import Modal from "../../../modals/Modal";
import { useSelector } from "react-redux";

const ModuleForm = (props) => {
  const [content, setContent] = useContent(true);
  const editingModuleIndex = useSelector(
    (state) => state.proj.editingModuleIndex
  );
  return (
    <Modal>
      <CardHeader></CardHeader>
    </Modal>
  );
};

export default ModuleForm;
