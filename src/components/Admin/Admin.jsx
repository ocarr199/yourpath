// ⬇ What dependencies we need to import
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// ⬇ What custom components we need to import
import EmployeeCard from "./EmployeeCard";
import rejectNonAdmin from "../RejectNonAdmin/RejectNonAdmin";
// ⬇ What we are importing from Material-ui
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
}));

export default function Admin() {
  // ⬇ variables we need to declare
  const access = rejectNonAdmin();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // ⬇ grabbing from the redux store
  const users = useSelector((store) => store.allUsers);

  // ⬇ On page load, fetch the patient information
  useEffect(() => {
    // ⬇ Grab this provider details
    dispatch({ type: "FETCH_ALL_USERS" });
  }, []);

  // ⬇ Pushes to the registration page
  const handleRegister = () => {
    history.push("/registration");
  };

  return (
    <div className="container">
      {access ? (
        <div>
          <h1 className="center">YourPath Employees</h1>
          <Grid container className={classes.root} spacing={2} row>
            {users.map((employee) => {
              return (
                <Grid item xs={4} key={employee.id}>
                  <EmployeeCard key={employee.id} employee={employee} />
                </Grid>
              );
            })}
          </Grid>
          <Fab
            variant="extended"
            aria-label="Add Provider"
            className={classes.fab}
            color="primary"
            onClick={handleRegister}
          >
            <AddIcon className="extendedIcon" />
            Add New Employee
          </Fab>
        </div>
      ) : (
        <h1 className="center">
          You don't have access to view this page. Please speak to your direct
          supervisor.
        </h1>
      )}
    </div>
  );
}
