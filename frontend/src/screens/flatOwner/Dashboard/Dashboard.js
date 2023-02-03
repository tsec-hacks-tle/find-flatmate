import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../../../App.css";

const Dashboard = () => {
  return (
    <Fragment>
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <h1 className='my-4'>Dashboard</h1>
          <div className='row pr-4'>
            <div className='col-xl-12 col-sm-12 mb-3'></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
