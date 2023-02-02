import React from "react";
import SectionHeader from "./SectionHeader";
import classes from "../JobHunterUpdate.module.css";
import TechnologyArray from "../../../../../utils/TechnologyArray";
import Select from "react-select";
import foodArray from "../../../../../utils/FoodArray";

const selectStyles = {
  control: (base) => ({
    ...base,
    background: "#f1f3f5",
    fontSize: "1.2rem",
    padding: " 0 0",
  }),
};

const AddSkills = ({ handleSkills }) => {
  return (
    <section>
      <SectionHeader title='Food Preference'></SectionHeader>
      <div className={classes["location-container"]}>
        <h1>Select food preference</h1>
        <Select
          options={foodArray}
          name='food_preference'
          styles={selectStyles}
          onChange={handleSkills}
        />
      </div>
    </section>
  );
};

export default AddSkills;
