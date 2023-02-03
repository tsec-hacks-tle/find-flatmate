import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import classes from "../../../components/project/Projects.module.css";
import Project from "../../../components/project/Project";
import axios from "axios";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);

  const callAPI = async () => {
    const { data } = await axios.get("/api/v1/rooms/me");

    if (data.status === "success") {
      setRooms(data?.data?.data);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <React.Fragment>
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
          <section className={classes["section-projects"]}>
            <div className={classes["projects"]}>
              {rooms &&
                rooms.map((room) => (
                  <Project key={room._id} project={room} removeMatch={false} />
                ))}
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllRooms;
