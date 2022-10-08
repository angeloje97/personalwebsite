import Button from "../src/components/elements/Button";
import Input from "../src/components/elements/Input";
import style from "./testing.module.css";
const Testing = () => {
  return (
    <div className={style.test1}>
      <Button>Random Button</Button>
      <Input></Input>
    </div>
  );
};
export default Testing;
