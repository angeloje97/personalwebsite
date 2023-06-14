import List from "../elements/List";
import style from "./References.module.css";

const references = [
  {
    name: "Ricardo Marroquin",
    role: "Lead Developer",
    company: "We2Link",
    entry:
      "As the lead developer at We2Link and liaison during Angelo's final year at Cal State LA, I was able to become familiar the work produced by Angelo during his time with We2Link. Although his time with us was only for a short period, about eight months, his ability to effectively complete tasks in a reasonable amount of time made him a valuable asset for our organization. " +
      "During his tenure within our company, Angelo was responsible for developing various new features for our website. He quickly became proficient in utilizing the tools and software used for working on our site. Tasks given to him and his group would always be completed promptly and in less time than was expected. " +
      "Angelo has a strong work ethic and was always reliable during his time at We2Link. The work he produced was always of high quality with very few errors if any. Because of this, I would recommend Angelo Esmeralda as a candidate for a position within any organization. If given the opportunity, I feel he will prove to be a worthy asset.",
  },
];

const References = () => {
  const referencesContent = references.map((reference) => {
    return <Reference referenceData={reference} key={reference.name} />;
  });
  return (
    <div className={style.body}>
      <h2>References</h2>
      <List className={style.referenceList}>{referencesContent}</List>
    </div>
  );
};

const Reference = ({ referenceData }) => {
  const { name, role, company, entry } = referenceData;
  return (
    <li>
      <h3>
        {name}: {role} at {company}
      </h3>
      <p>{entry}</p>
    </li>
  );
};

export default References;
