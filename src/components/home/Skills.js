import React from "react";
import ProgressBar from "../elements/ProgressBar.js";
import style from "./Skills.module.css";
import List from "../elements/List.js";
import formatter from "../../../styles/formatter.module.css";

const skillData = [
  {
    type: "Languages/Databases",
    skills: [
      { name: "C#", value: 0.7, unit: "7 Years" },
      { name: "C++", value: 0.5, unit: "5 Years" },
      { name: "Javascript", value: 0.5, unit: "5 Years" },
      { name: "Java", value: 0.8, unit: "8 Years" },
      { name: "Python", value: 0.5, unit: "5 Years" },
      { name: "MySQL", value: 0.6, unit: "6 Years" },
      { name: "Firebase", value: 0.4, unit: "4 Years" },
      { name: "MongoDB", value: 0.4, unit: "4 Years" },
    ],
  },
  {
    type: "Frameworks/Libraries",
    skills: [
      { name: "Unity", value: 0.6, unit: "6 Years" },
      { name: "NextJS", value: 0.6, unit: "5 Year" },
      { name: "React", value: 0.5, unit: "5 Years" },
      { name: ".NET", value: 0.5, unit: "5 Years" },
    ],
  },
  {
    type: "Tech Categories",
    skills: [
      { name: "Game Developement", value: 0.6, unit: "6 Years" },
      { name: "Full Stack", value: 0.5, unit: "5 Years" },
    ],
  },
];

const Skills = (props) => {
  const skillsDisplay = skillData.map((data) => {
    const skills = data.skills.map((skill) => (
      <li key={skill.name}>
        <SkillBar {...skill} />
      </li>
    ));

    return (
      <div key={data.type} className={style.skillSection}>
        <h2>{data.type}</h2>
        <List className={style.skillList}>{skills}</List>
      </div>
    );
  });
  return (
    <React.Fragment>
      <h2 className={formatter.centerHorizontal}>Skills</h2>
      {skillsDisplay}
    </React.Fragment>
  );
};

const SkillBar = ({ name, value, unit }) => {
  return (
    <div className={style.skillSection}>
      <span>
        <h3>{name}</h3>
        <h4>{unit}</h4>
      </span>
      <ProgressBar value={value} className={style.progressBar} />
    </div>
  );
};

export default Skills;
