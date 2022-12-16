import ResumeDL from "../../src/components/resume/ResumeDL";
import { styleGroup } from "../../src/helpers/styles";
import style from "./Resume.module.css";
const Resume = () => {
  return (
    <div className={style.resumes}>
      <ResumeDL
        resume="Resume2022_3.pdf"
        name="Software Engineer"
        image="Resume2022_2.png"
      />
    </div>
  );
};

export default Resume;
