import React from "react";
import CardHeader from "../cards/CardHeader";
import Image from "../elements/Image";
import style from "./ProjectHighlights.module.css";
import List from "../elements/List";

const projects = [
  {
    name: "Architome",
    thumbnail: "/resources/pictures/Architome1.png",
    description:
      "A game that I've put a lot of heart and soul into since 2021. An action RPG in which the player is able to micromanage " +
      "5 party members through dungeons. Mechanics include enemy behavior, inventory and item management, party management, quest systems," +
      "procedural dungeons, guild systems, and much more.",
    links: [
      {
        name: "More",
        url: "projects/select?id=6344b5ba98d645313a2545b9",
      },
    ],
    tech: ["Unity", "C#"],
  },
  {
    name: "Personal Website",
    thumbnail: "/resources/pictures/Website_1.png",
    description:
      "This project is the website you are using right now! It's more than just a portfolio website. " +
      "I'm using the NextJS framework to develop a full stack website that will allow me to update information without editing code. " +
      "This project is what allows me to easily create documentation for my other projects.",
    links: [
      {
        name: "More",
        url: "projects/select?id=6344b87198d645313a2545bb",
      },
    ],
    tech: ["Javascript", "NextJS", "React"],
  },
];

const ProjectHighlights = (props) => {
  const currentProjects = projects.map((project) => (
    <Project key={project.name} projectData={project} />
  ));
  return (
    <React.Fragment>
      <h2>Project Highlights</h2>
      <div className={style.highlights}>{currentProjects}</div>
    </React.Fragment>
  );
};

const Project = ({ projectData: data }) => {
  const links = data.links.map((link) => (
    <a href={link.url} key={link.url}>
      {link.name}
    </a>
  ));

  const technologyUsed = data.tech.map((tech) => <li key={tech}>{tech}</li>);
  return (
    <CardHeader
      className={style.projectCard}
      header={<Image src={data.thumbnail}></Image>}
    >
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <h4>Technology Used</h4>
      <List>{technologyUsed}</List>
      <div>{links}</div>
    </CardHeader>
  );
};

export default ProjectHighlights;
