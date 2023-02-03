import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RecruiterSignupForm from "./RecruiterSignupForm";
import JobHunterSignupForm from "./JobHunterSignupForm";

const useStyles = makeStyles(() => ({
  tab: {
    marginBottom: "3rem",
  },
}));

const SignupTabs = () => {
  const [role, setRole] = useState("tenant");
  const classes = useStyles();

  const handleChange = (event, value) => {
    setRole(value);
  };

  return (
    <div className='hero-auth'>
      <div className='hero-form'>
        <TabContext value={role}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className={classes.tab}>
            <TabList onChange={handleChange}>
              <Tab
                label='Signup as Tenant'
                style={{ fontSize: "1.2rem" }}
                value='tenant'
              />
              <Tab
                label='Signup as Room Owner'
                style={{ fontSize: "1.2rem" }}
                value='flatowner'
              />
            </TabList>
          </Box>
          <TabPanel value='tenant' style={{ width: "100%", padding: 0 }}>
            <JobHunterSignupForm />
          </TabPanel>
          <TabPanel value='flatowner' style={{ width: "100%", padding: 0 }}>
            <RecruiterSignupForm />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default SignupTabs;
