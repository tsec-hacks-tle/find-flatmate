import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import ProjectsSkeletion from "../project/ProjectsSkeletion";
import FilterSection from "./FilterSection";
import JobHunter from "./JobHunter";
import classes from "./Users.module.css";
import DefaultPhoto from "../../assets/default.jpg";

const SectionUsers = () => {
  const { users, isLoading } = useSelector((state) => state.jobHunters);

  return (
    <section className={classes["section-projects"]}>
      <div className={classes["projects"]}>
        <ChakraProvider>
          {isLoading ? (
            <ProjectsSkeletion />
          ) : users.length === 0 ? (
            <p className='not-found grid-span'>Couldn't find any mates.</p>
          ) : (
            users.map((project) => (
              <JobHunter key={project._id} user={project} />
            ))
          )}
        </ChakraProvider>
      </div>
    </section>
  );
};

export default SectionUsers;
