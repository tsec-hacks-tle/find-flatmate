import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Projects.module.css";

import ImageHouse from "../../assets/img_house.webp";
import { Icon, StarIcon } from "@chakra-ui/icons";

const Project = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className={classes["card"]}>
      <div className={classes["card-image"]}>
        <img
          src={ImageHouse}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
      </div>

      <div className={classes["card-body"]}>
        <div className={classes["card-name"]}>
          <h1>{project.buildingName}</h1>
        </div>

        <div className={classes["card-second-name"]}>
          <h1>
            {project.state},{project.city}
          </h1>
        </div>

        <div className={classes["card-footer"]}>
          <div className={classes["card-rating"]}>
            <Icon as={StarIcon} w={7} h={5} color='yellow.500' />
            <p style={{ fontSize: "15px" }}>{project.ratingsAverage}</p>
          </div>

          <div className={classes["card-capacity"]}>
            <p>Max: {project.capacity} People</p>
          </div>

          <div className={classes["card-capacity"]}>
            <p> ₹ {project.price}</p>
          </div>
        </div>
      </div>
    </div>

    // <div
    //   className={classes["project"]}
    //   onClick={() => navigate(`/project/${project._id}`)}>
    //   <img src={project.photo.url} alt={project.title} />
    //   <p>{project.title}</p>
    // </div>
  );
};

export default Project;
