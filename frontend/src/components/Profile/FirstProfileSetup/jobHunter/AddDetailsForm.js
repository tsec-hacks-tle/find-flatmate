import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import classes from "./JobHunterUpdate.module.css";
import Select from "react-select";
import { reset, updateUser } from "../../../../store/auth/authSlice";
import { buttonStyles } from "../../../layout/compnentStyles";
import { Button, CircularProgress } from "@mui/material";
import genders from "../../../../utils/GenderArray";

const selectStyles = {
  control: (base) => ({
    ...base,
    background: "#f1f3f5",
    fontSize: "1.2rem",
    padding: " 0 1rem",
  }),
};

const AddDetailsForm = ({ changeStep }) => {
  const { user, isError, isUpdateSuccess, message, isUpdateLoading } =
    useSelector((state) => state.auth);
  const alert = useAlert();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    photo: "",
    name: user.name || "",
    email: user.email || "",
    phone_number: null,
    gender: "",
    age: "",
    bio: "",
  });
  const [photoPreview, setPhotoPreview] = useState("");

  const { photo, name, email, phone_number, gender, age, bio } = formData;

  useEffect(() => {
    if (isError) alert.error(message);

    if (isUpdateSuccess) changeStep();

    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isError, isUpdateSuccess, message, dispatch, alert]);

  const handleImage = (e) => {
    if (e.target.files[0] && !e.target.files[0].type.startsWith("image")) {
      return alert.error("Only images are allowed");
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhotoPreview(reader.result);
        setFormData((prevState) => ({
          ...prevState,
          photo: reader.result,
        }));
      }
    };

    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const onChange = (e) => {
    if (e.target.name === "photo") {
      handleImage(e);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!photo) return alert.error("Please select a photo");

    // Create formData
    const updateData = new FormData();
    updateData.set("name", name);
    updateData.set("email", email);
    updateData.set("photo", photo);
    updateData.set("phone_number", String(phone_number));
    updateData.set("gender", gender);
    updateData.set("age", age);
    updateData.set("bio", bio);

    //Call api
    dispatch(updateUser(formData));
  };

  return (
    <div className={classes["profile-update-form"]}>
      <label htmlFor='photo' style={{ width: "180px", height: "180px" }}>
        <input
          name='photo'
          type='file'
          id='photo'
          style={{ display: "none" }}
          onChange={onChange}
          accept='image/*'
          required
        />
        <div className={classes["profile-image"]}>
          {photoPreview ? (
            <img src={photoPreview} alt='avatar' />
          ) : (
            <p>Add Photo +</p>
          )}
        </div>
      </label>
      <div className={classes["profile-update-fields"]}>
        <form onSubmit={submitHandler}>
          <div className={classes["form-group"]}>
            <label htmlFor='name'>Full Name</label>
            <input
              id='name'
              name='name'
              value={name}
              type='text'
              placeholder='Ex. John Doe'
              onChange={onChange}
              required
            />
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              value={email}
              type='text'
              placeholder='Ex. johndoe@gmail.com'
              onChange={onChange}
              disabled
              required
            />
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor='phone_number'>Phone Number</label>
            <input
              id='phone_number'
              name='phone_number'
              value={phone_number}
              type='text'
              placeholder='+91'
              onChange={onChange}
              required
            />
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor='city'>Gender</label>
            <Select
              options={genders}
              name='gender'
              styles={selectStyles}
              onChange={(e) => {
                console.log(e);
                setFormData((prevState) => ({ ...prevState, gender: e.value }));
              }}
            />
          </div>
          {/* <div className={classes["form-group"]}>
            <label htmlFor='city'>City</label>
            <Select
              options={LocationArray}
              name='city'
              styles={selectStyles}
              onChange={(e) =>
                setFormData((prevState) => ({ ...prevState, city: e.value }))
              }
            />
          </div> */}

          <div className={classes["form-group"]}>
            <label htmlFor='age'>Age</label>
            <input
              id='age'
              name='age'
              value={age}
              type='number'
              placeholder='-'
              onChange={onChange}
              required
            />
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor='bio'>Write something about yourself</label>
            <textarea
              id='bio'
              name='bio'
              value={bio}
              rows='4'
              cols='50'
              style={{ resize: "vertical" }}
              onChange={onChange}
              required></textarea>
          </div>

          <Button
            type='submit'
            sx={buttonStyles}
            variant='contained'
            disabled={isUpdateLoading}>
            {isUpdateLoading ? (
              <CircularProgress size='2.4rem' color='grey' />
            ) : (
              "Next"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddDetailsForm;
