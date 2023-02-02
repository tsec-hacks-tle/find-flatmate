import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import classes from "../JobHunterUpdate.module.css";
import Select from "react-select";
import { useAlert } from "react-alert";

const selectStyles = {
  control: (base) => ({
    ...base,
    background: "#f1f3f5",
    fontSize: "1.2rem",
    padding: " 0 0",
  }),
};

const AddEduModal = ({ handleChange, action, work = {}, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    degree: work.degree || "",
    college: work.college || "",
    course: work.course || "",
  });

  const { degree, college, course } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "add") {
      const obj = {
        id: new Date().toISOString(),
        degree,
        college,
        course,
      };

      handleChange("add", obj);
    } else if (action === "edit") {
      const obj = {
        degree,
        college,
        course,
      };

      handleChange("edit", obj, work);
    }

    onClose();

    // Reset
    setFormData({
      degree: "",
      college: "",
      course: "",
    });
  };

  return (
    <>
      {children ? <span onClick={onOpen}>{children}</span> : <></>}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='4xl'
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent h='500px'>
          <ModalHeader>
            <h1 className={classes["add-project-title"]}>Add Education</h1>
          </ModalHeader>
          <hr style={{ backgroundColor: "#ccc" }} />
          <ModalCloseButton />
          <ModalBody overflow='scroll'>
            <div className={classes["add-experience-modal-body"]}>
              <form onSubmit={handleSubmit}>
                <div className={classes["form-group"]}>
                  <label htmlFor='companyName'>Degree *</label>
                  <input
                    id='degree'
                    name='degree'
                    value={degree}
                    style={{ width: "100%" }}
                    type='text'
                    placeholder='Type of Degree'
                    onChange={onChange}
                    required
                  />
                </div>

                <div className={classes["form-group"]}>
                  <label htmlFor='jobRole'>College Name *</label>
                  <input
                    id='college'
                    name='college'
                    value={college}
                    style={{ width: "100%" }}
                    type='text'
                    placeholder='College Name'
                    onChange={onChange}
                    required
                  />
                </div>

                <div className={classes["form-group"]}>
                  <label htmlFor='employmentType'>Course Name *</label>
                  <input
                    id='course'
                    name='course'
                    value={course}
                    style={{ width: "100%" }}
                    type='text'
                    placeholder='Your Course Name'
                    onChange={onChange}
                    required
                  />
                </div>
                <ModalFooter>
                  <Button type='submit' colorScheme='blue' size='lg'>
                    {action === "add" ? "Submit" : "Update"}
                  </Button>
                </ModalFooter>
              </form>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEduModal;
