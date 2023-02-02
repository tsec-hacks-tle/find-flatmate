import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SectionProjects from "../components/project/SectionProjects";
import SectionSearch from "../components/project/SectionSearch";
import { fetchProjects, reset } from "../store/projects/projectSlice";

const ShowProjects = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message } = useSelector((state) => state.projects);

  useEffect(() => {
    if (user && user.role !== "tenant") {
      navigate("/owner/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchProjects({ page: "1", perPage: "100", keyword: "" }));
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
      <SectionProjects />
    </>
  );
};

export default ShowProjects;
