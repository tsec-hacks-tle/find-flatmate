import React from "react";
import SectionHeader from "./SectionHeader";
import classes from "../JobHunterUpdate.module.css";
import AddExperienceModal from "./AddExperienceModal";
import { ChakraProvider } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import AddEduModal from "./AddEduModal";

const AddEduction = ({ handleWorkExp, workArray }) => {
  const handleChange = (action, obj, oldObj = {}) => {
    if (action === "add") handleWorkExp("add", obj);
    else if (action === "edit") {
      handleWorkExp("edit", obj, oldObj);
    } else if (action === "delete") handleWorkExp("delete", obj);
  };

  return (
    <section>
      <SectionHeader title='Add Eduction'></SectionHeader>
      <div className={classes["location-container"]}>
        <div className={classes["work-experience-header"]}>
          <h1 style={{ fontSize: "1.3rem" }}>Add Eduction</h1>
          <ChakraProvider>
            <AddEduModal handleChange={handleChange} action='add'>
              {workArray < 1 && (
                <button
                  className={`${classes["btn-small"]} ${classes["btn-primary"]}`}>
                  +
                </button>
              )}
            </AddEduModal>
          </ChakraProvider>
        </div>

        {workArray.length > 0 && (
          <div className={classes["experience-cards"]}>
            {workArray.map((el) => (
              <div className={classes["experience-card"]} key={el.id}>
                <div className={classes["main-content"]}>
                  <div className={classes["left-part"]}>
                    <p className={classes["work-position"]}>{el.college}</p>
                    <p className={classes["work-company"]}>{el.course}</p>
                  </div>
                </div>
                <div className={classes["main-actions"]}>
                  <p>{el.degree}</p>
                  <div>
                    <ChakraProvider>
                      <AddEduModal
                        handleChange={handleChange}
                        action='edit'
                        work={el}>
                        <button
                          className={`${classes["btn-xs"]} ${classes["btn-primary"]}`}>
                          <EditIcon />
                        </button>
                      </AddEduModal>
                    </ChakraProvider>
                    <button
                      className={`${classes["btn-xs"]} ${classes["btn-danger"]}`}
                      onClick={handleChange.bind(this, "delete", el)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AddEduction;
