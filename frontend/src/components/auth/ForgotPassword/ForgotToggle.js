import { Tab, Tabs } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles(() => ({
  tab: {
    marginBottom: "3rem",
  },
}));

const ForgotToggle = ({ handleRoleChange, role }) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    handleRoleChange(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: 1,
        borderColor: "divider",
      }}
      className={classes.tab}>
      <Tabs
        textColor='primary'
        indicatorColor='primary'
        aria-label='secondary tabs example'
        onChange={handleChange}
        value={role}>
        <Tab
          value='tenant'
          className={`${classes.btn} ${classes.jobCta} `}
          style={{ fontSize: "1.2rem" }}
          label='Forgot as Tanent'
        />
        <Tab
          className='recruiter_cta'
          value='owner'
          style={{ fontSize: "1.2rem" }}
          label='Forgot as Room Owner'
        />
      </Tabs>
    </Box>
  );
};

export default ForgotToggle;
