import React from "react";
import classes from "./ProjectDetails.module.css";
import DefaultPhoto from "../../assets/default.jpg";
import { useSelector } from "react-redux";
import SaveButton from "./SaveButton";

const ProjectDetailsHeader = ({ project }) => {
  return (
    <div className={classes["project-header"]}>
      <div className={classes["project-user-info"]}>
        <div className={classes["project-image"]}>
          <img
            src={project.user?.photo?.url || DefaultPhoto}
            alt={project?.user?.name}
          />
        </div>
        <div className={classes["project-user"]}>
          <h1>{project?.title}</h1>
          <p>{project?.user?.name}</p>
        </div>
      </div>

      <SaveButton project={project} />
    </div>
  );
};

export default ProjectDetailsHeader;
