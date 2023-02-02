import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobHunterAvailableLocations from "./JobHunterAvailableLocations";
import JobHunterAvailablilty from "./JobHunterAvailablilty";
import JobHunterCertificates from "./JobHunterCertificates";
import classes from "./jobHunterDetails.module.css";
import JobHunterDetailsHeader from "./JobHunterDetailsHeader";
import JobHunterProjects from "./JobHunterProjects";
import JobHunterSkills from "./JobHunterSkills";
import JobHunterWorkExp from "./JobHunterWorkExp";
import io from "socket.io-client";
import { addNotifications } from "../../store/notifications/notificatonSlice";

const ENDPOINT = "https://programmer-recruiter-krish.onrender.com/";
var socket;

const JobHunterDetails = () => {
  const { singleUser } = useSelector((state) => state.jobHunters);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.id || !user?.role) return;

    let timer;

    if (user.role === "recruiter") {
      timer = setTimeout(() => {
        console.log("Send notification");
        socket = io(ENDPOINT);
        dispatch(
          addNotifications({
            user: singleUser._id,
            content: "A recruiter viewed your profile",
          })
        );
        socket.emit("send notification", {
          action: "profile",
          recruitId: user.id,
          jobHunterId: singleUser._id,
        });
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={classes["user-proile-section"]}>
      <JobHunterDetailsHeader user={singleUser} />
      <JobHunterSkills user={singleUser} />
      <JobHunterProjects user={singleUser} />
      <JobHunterCertificates user={singleUser} />
      <JobHunterWorkExp user={singleUser} />
      <JobHunterAvailableLocations user={singleUser} />
      <JobHunterAvailablilty user={singleUser} />

      {/* 
      This component is yet to complete (Projects) <JobHunterProjects user={singleUser} />
      Backend mai getUser mai projects bhi send karo
       */}
    </section>
  );
};

export default JobHunterDetails;
