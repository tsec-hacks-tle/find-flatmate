import React from "react";
import updateImage from "../../../../assets/talent-profile.webp";
import classes from "./JobHunterUpdate.module.css";

const LeftUpdateSection = () => {
  return (
    <div className={classes["section-update-left"]}>
      <div className={classes["section-info"]}>
        <h1>Let's get your profile ready.</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
          laborum quas voluptate corrupti saepe? Natus doloribus odio similique
          dolore aliquam, incidunt itaque molestiae nesciunt. Totam sit aperiam
          tenetur vero quos?.
        </p>
      </div>
      <div className={classes["image-container"]}>
        <img src={updateImage} alt='' />
      </div>
    </div>
  );
};

export default LeftUpdateSection;
