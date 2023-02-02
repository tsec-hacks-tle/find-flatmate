import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import classes from "../jobHunter/JobHunterUpdate.module.css";
import { reset, updateUser } from "../../../../store/auth/authSlice";
import { buttonStyles } from "../../../layout/compnentStyles";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import genders from "../../../../utils/GenderArray";

const customStyles = {
  control: (base) => ({
    ...base,
  }),
};

const AddDetailsForm = () => {
  const { user, isError, isUpdateSuccess, message, isUpdateLoading } =
    useSelector((state) => state.auth);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    photo: "",
    name: user.name || "",
    email: user.email || "",
    website: "",
    description: "",
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [gender, setGender] = useState("");

  const { photo, name, email, website, description } = formData;

  useEffect(() => {
    if (isError) alert.error(message);

    if (isUpdateSuccess) navigate("/search/rooms");

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

    console.log(formData);
    // Create formData
    const updateData = new FormData();
    updateData.set("name", name);
    updateData.set("email", email);
    updateData.set("photo", photo);
    updateData.set("gender", gender);
    updateData.set("bio", description);
    updateData.set("gender", gender);

    // //Call api
    dispatch(updateUser(formData));
  };

  return (
    <div className={classes["profile-update-form"]} style={{ padding: "2rem" }}>
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
            <label htmlFor='name'>Owner Name *</label>
            <input
              id='name'
              name='name'
              value={name}
              type='text'
              placeholder='Ex. Amazon,Google'
              onChange={onChange}
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor='email'>Owner Email *</label>
            <input
              id='email'
              name='email'
              value={email}
              type='text'
              placeholder='Ex. johndoe@company.com'
              onChange={onChange}
              disabled
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor='website'>Owner Gender</label>
            <div style={{ width: "100%" }}>
              <Select
                name='location'
                onChange={(e) => {
                  setGender(e.value);
                }}
                options={genders}
                className='basic-multi-select'
                classNamePrefix='select'
                placeholder='Select Gender'
                styles={customStyles}
              />
            </div>
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor='bio'>About You</label>
            <textarea
              id='description'
              name='description'
              value={description}
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
