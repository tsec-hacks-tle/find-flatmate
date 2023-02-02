import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import professionArray from "../../../../utils/ProfessionArray";
import SectionHeader from "./AdditionalInfo/SectionHeader";
import classes from "./JobHunterUpdate.module.css";
import Select from "react-select";
import AddWorkExp from "./AdditionalInfo/AddWorkExp";
import AddEduction from "./AdditionalInfo/AddEduction";
import { buttonStyles } from "../../../layout/compnentStyles";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateUser } from "../../../../store/auth/authSlice";
import { useAlert } from "react-alert";

const ProfessionalInformation = ({ changeStep }) => {
  const [profession, setProfession] = useState("");
  const [workExp, setWorkExp] = useState([]);
  const [eduction, setEduction] = useState([]);
  const { user, isError, isUpdateSuccess, message, isUpdateLoading } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const alert = useAlert();

  const selectStyles = {
    control: (base) => ({
      ...base,
      background: "#f1f3f5",
      fontSize: "1.2rem",
      padding: " 0 0",
    }),
  };

  const handleWorkExp = (action, newObj, oldObj = {}) => {
    if (action === "add") {
      setWorkExp((prev) => [...prev, newObj]);

      // Delete
    } else if (action === "delete") {
      setWorkExp((prev) => prev.filter((el) => el.id !== newObj.id));

      // Edit
    } else if (action === "edit") {
      console.log(oldObj);
      const newWorks = workExp.map((element, index) => {
        if (element.id === oldObj.id) {
          return (workExp[index] = { ...newObj, id: new Date().toISOString() });
        }
        return workExp[index];
      });
      setWorkExp(newWorks);
    }
  };

  const handleEduction = (action, newObj, oldObj = {}) => {
    if (action === "add") {
      setEduction((prev) => [...prev, newObj]);

      // Delete
    } else if (action === "delete") {
      setEduction((prev) => prev.filter((el) => el.id !== newObj.id));

      // Edit
    } else if (action === "edit") {
      console.log(oldObj);
      const newWorks = workExp.map((element, index) => {
        if (element.id === oldObj.id) {
          return (workExp[index] = { ...newObj, id: new Date().toISOString() });
        }
        return workExp[index];
      });
      setEduction(newWorks);
    }
  };

  useEffect(() => {
    if (isError) alert.error(message);

    if (isUpdateSuccess) changeStep();

    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isError, isUpdateSuccess, message, dispatch, alert]);

  const submitHandler = () => {
    // Create formData
    const data = {
      experience: workExp,
      profession: profession,
      eduction: eduction,
    };

    console.log(data);

    //Call api
    dispatch(updateUser(data));
  };

  return (
    <div className={classes["step3-form"]}>
      <ChakraProvider>
        <section>
          <SectionHeader title='Profession'></SectionHeader>
          <div className={classes["location-container"]}>
            <h1>Select professions</h1>
            <Select
              name='aval'
              onChange={(e) => {
                console.log(e);
                setProfession(e.value);
              }}
              styles={selectStyles}
              options={professionArray}
              // className='basic-multi-select'
              classNamePrefix='select'
            />
          </div>
        </section>

        <AddWorkExp handleWorkExp={handleWorkExp} workArray={workExp} />

        <AddEduction handleWorkExp={handleEduction} workArray={eduction} />
      </ChakraProvider>

      <div
        style={{ textAlign: "right", marginRight: "20px", marginTop: "20px" }}>
        <Button
          type='submit'
          sx={buttonStyles}
          variant='contained'
          onClick={submitHandler}
          disabled={isUpdateLoading}>
          {isUpdateLoading ? (
            <CircularProgress size='2.4rem' color='grey' />
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfessionalInformation;
