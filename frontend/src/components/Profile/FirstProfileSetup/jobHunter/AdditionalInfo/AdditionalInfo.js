import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { reset, updateUser } from "../../../../../store/auth/authSlice";
import religionArray from "../../../../../utils/ReligionArray";
import { buttonStyles } from "../../../../layout/compnentStyles";
import classes from "../JobHunterUpdate.module.css";
import AddAvail from "./AddAvail";
import AddExperience from "./AddExperience";
import AddLocation from "./AddLocation";
import AddSkills from "./AddSkills";
import AddSocialLinks from "./AddSocialLinks";
import AddWorkExp from "./AddWorkExp";
import SectionHeader from "./SectionHeader";

const AdditionalInfo = () => {
  const [locations, setLocations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [religion, setReligion] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const { user, isError, isUpdateSuccess, message, isUpdateLoading } =
    useSelector((state) => state.auth);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLocation = (e) => {
    setLocations(e.map((el) => el.value));
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      background: "#f1f3f5",
      fontSize: "1.2rem",
      padding: " 0 0",
    }),
  };

  const handleSkills = (e) => {
    setSkills(e.value);
  };

  const handleSocialLinks = (e) => {
    const element = e.target;

    if (element.name === "linkedIn") setLinkedIn(element.value);
    else if (element.name === "gitHub") setGithubLink(element.value);
  };

  useEffect(() => {
    if (isError) alert.error(message);

    if (isUpdateSuccess) {
      navigate("/search/project");
    }

    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isError, isUpdateSuccess, message, dispatch, alert]);

  const submitHandler = () => {
    const formData = {
      hobbies: locations,
      food_preference: skills,
      religion: religion,
    };

    //Call api
    dispatch(updateUser(formData));
  };

  return (
    <div className={classes["step3-form"]}>
      <AddLocation handleLocation={handleLocation} />
      <AddSkills handleSkills={handleSkills} />

      <section>
        <SectionHeader title='Religion'></SectionHeader>
        <div className={classes["location-container"]}>
          <h1>Select your religion</h1>
          <Select
            options={religionArray}
            name='religion'
            styles={selectStyles}
            onChange={(e) => setReligion(e.value)}
          />
        </div>
      </section>

      <div
        style={{ textAlign: "right", marginRight: "20px", marginTop: "20px" }}>
        <Button
          sx={{ ...buttonStyles, padding: "0.5rem 2rem" }}
          variant='contained'
          onClick={submitHandler}
          disabled={isUpdateLoading}>
          {isUpdateLoading ? (
            <CircularProgress size='2.4rem' color='grey' />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdditionalInfo;
