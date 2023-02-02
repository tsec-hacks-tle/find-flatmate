import React from "react";
import SectionHeader from "./SectionHeader";
import classes from "../JobHunterUpdate.module.css";
import Select from "react-select";
import LocationArray from "../../../../../utils/LocationArray";
import hobbiesArray from "../../../../../utils/HobbiesArray";

const selectStyles = {
  control: (base) => ({
    ...base,
    background: "#f1f3f5",
    fontSize: "1.2rem",
    padding: " 0 0",
  }),
};

const AddLocation = ({ handleLocation }) => {
  return (
    <section>
      <SectionHeader title='Hobbies'></SectionHeader>
      <div className={classes["location-container"]}>
        <h1>Select your hobbies or interests</h1>
        <Select
          isMulti
          name='hobbies'
          onChange={handleLocation}
          styles={selectStyles}
          options={hobbiesArray}
          className='basic-multi-select'
          classNamePrefix='select'
        />
      </div>
    </section>
  );
};

export default AddLocation;
