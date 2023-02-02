import React from "react";
import classes from "./Users.module.css";
import DefaultPhoto from "../../assets/default.jpg";
import { Link, useNavigate } from "react-router-dom";
import rightIcon from "../../assets/thumbsUp.svg";
import { Icon, StarIcon } from "@chakra-ui/icons";

const JobHunter = ({ user }) => {
  const navigate = useNavigate();

  let photo = null;

  if (user?.photo?.url) {
    photo = user.photo.url;
  } else {
    photo = DefaultPhoto;
  }

  return (
    <div className={classes["card"]}>
      <div className={classes["card-match-header"]}>
        <div className={classes["card-match"]}>
          <img
            src={rightIcon}
            alt='thumbs up'
            style={{ height: "12px", width: "auto" }}
          />
          <span
            style={{
              color: "rgb(46, 201, 113)",
              marginLeft: "5px",
              marginRight: "5px",
              fontWeight: "bold",
            }}>
            {user?.match}%
          </span>
          Match
        </div>
      </div>
      <div className={classes["card-image"]}>
        <img
          src={photo}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
      </div>

      <div className={classes["card-body"]}>
        <div className={classes["card-name"]}>
          <h1>{user?.name}</h1>
        </div>

        <div className={classes["card-second-name"]}>
          <h1 style={{ fontSize: "1.6rem" }}>{user.profession}</h1>
        </div>

        <div className={classes["card-footer"]}>
          <div className={classes["card-rating"]}>
            <Icon as={StarIcon} w={7} h={5} color='yellow.500' />
            <p style={{ fontSize: "15px" }}>{4.5}</p>
          </div>

          <div className={classes["card-capacity"]}>
            <p>{user.gender}</p>
          </div>

          <div className={classes["card-capacity"]}>
            {/* <p> ₹ {project.price}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHunter;
