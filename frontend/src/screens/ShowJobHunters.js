import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SectionSearch from "../components/jobHunters/SectionSearch";
import SectionUsers from "../components/jobHunters/SectionUsers";
import { fetchJobHunters, reset } from "../store/jobHunters/jobHunterSlice";

const ShowJobHunters = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message } = useSelector((state) => state.jobHunters);

  useEffect(() => {
    if (user && user.role !== "tenant") {
      navigate("/owner/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchJobHunters());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  return (
    <>
      <SectionSearch />
      <SectionUsers />
    </>
  );
};

export default ShowJobHunters;
