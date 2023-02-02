import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCollections,
  deleteFromCollections,
  reset,
} from "../../store/collections/collectionSlice";
import classes from "./ProjectDetails.module.css";

const SaveButton = ({ project }) => {
  const { user } = useSelector((state) => state.auth);
  const { collections, isLoading, isAddSuccess, isDeleteSuccess } = useSelector(
    (state) => state.collections
  );
  const [isProjectSaved, setIsProjectSaved] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    const index = collections?.findIndex((el) => el._id === project._id);
    if (index >= 0) setIsProjectSaved(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAddSuccess) {
      setIsProjectSaved(true);
      alert.success("Project saved to collection");
    }
    if (isDeleteSuccess) {
      setIsProjectSaved(false);
      alert.success("Project removed to collection");
    }

    dispatch(reset());
  }, [isAddSuccess, alert, isDeleteSuccess, dispatch]);

  const submitHandler = () => {
    if (isProjectSaved) {
      return dispatch(deleteFromCollections(project._id));
    }

    dispatch(addToCollections(project));
  };

  return (
    <>
      {user ? (
        <div className={classes["project-actions"]}>
          <button
            onClick={submitHandler}
            disabled={isLoading}
            className={`${classes["project-action-btn"]} ${
              isProjectSaved && classes.buttonBlack
            } `}>
            <p>{isLoading ? "Loading" : "Save"}</p>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SaveButton;
