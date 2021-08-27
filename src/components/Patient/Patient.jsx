// ⬇ What dependencies we need to import
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// ⬇ What we are importing from Material-ui
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddPatient from "./AddPatient";
import Grid from '@material-ui/core/Grid';

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    maxWidth: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  grid: {
    flexGrow: 1,
  },
}));

export default function Patient() {
  // ⬇ What variables we need to declare
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [showActive, setShowActive] = useState(true);
  // ⬇ What we are grabbing from the redux store
  const allPatient = useSelector((store) => store.patient.allPatients);
  const patientTag = useSelector((store) => store.patientTag);


  useEffect(() => {
    console.log("use effect");
    dispatch({
      type: "FETCH_ALL_PATIENT",
      payload: { active: true },
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // ⬇ will show patient details only if patient has at least one provider recommendation
  const goToPatientDetails = (patient) => {
    history.push(`/patientDetail/${patient.id}`);
  };

  // ⬇ local state for open or closed status of add patient pop up
  const [open, setOpen] = useState(false);
  // open or closed status of error pop up if user forgets to select one tag for patient on add patient
  const [openError, setOpenError] = useState(false);

  // ⬇ toggles view back to active patients
  const viewActivePatients = () => {
    setShowActive(true);
    dispatch({
      type: "FETCH_ALL_PATIENT",
      payload: { active: true },
    });
  };

  // ⬇ toggles view to inactive patients
  const viewInactivePatients = () => {
    setShowActive(false);
    dispatch({
      type: "FETCH_ALL_PATIENT",
      payload: { active: false },
    });
  };

  // ⬇ on click of add patient, opens dialog form
  const handleAddPatient = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    dispatch({
      type: "CLEAR_PATIENT_TAGS",
    });
  };

  // ⬇ inside form dialog, click of add patient dispatches all selected tags to database
  const confirmAdd = () => {
    if (patientTag.length) {
      dispatch({
        type: "ADD_PATIENT",
        payload: patientTag,
      });
      setOpen(false);
      dispatch({
        type: "CLEAR_PATIENT_TAGS",
      });
    } else if (!patientTag.length) {
      setOpenError(true);
    }
  };

  const handleCancelError = () => {
    setOpenError(false);
  }

  const generateRecs = (patient) => {
    dispatch({
      type: "AUTO_GENERATE_RECS",
      payload: patient,
    });
  };

  return (
    <div className="container">
      {/* conditional render for active vs inactive patient view */}
      {showActive ? (
        <h1 className="center">Patients</h1>
      ) : (
        <h1 className="center">Inactive Patients</h1>
      )}
      <div className="header-box">
        {/* conditional render for active vs inactive patient view */}
        {showActive ? (
          <Button
            variant="contained"
            color="primary"
            onClick={viewInactivePatients}
          >
            View Inactive Patients
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={viewActivePatients}
          >
            View Active Patients
          </Button>
        )}
        <TextField
          value={search}
          onChange={handleSearchChange}
          id="outlined-basic"
          label="search for patient id"
          variant="outlined"
          className="center float-right"
        />
      </div>
      {/* set search state to whatever in put in text field */}
      <Grid container className={classes.grid} spacing={2}>
        {search !== ""
          ? allPatient
            .filter((patient) => patient.id == search)
            .map((patient) => (

              <Grid item xs={4}>
                <Card
                  style={{ cursor: "pointer" }}
                  className={classes.root}
                  key={patient.id}
                  onClick={() => goToPatientDetails(patient)}
                >
                  {/* renders generate recs button only if no provider matches. need to fix so 
          it tells user if there are no matches */}
                  {!patient.providers[0] && (
                    <Button
                      onClick={() => generateRecs(patient)}
                      variant="contained"
                      color="primary"
                    >
                      Generate Provider Recommendations
                    </Button>
                  )}
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Patient ID:{" "}
                      <section className="circle">{patient.id}</section>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Recommendations(s):
                    </Typography>
                    {patient?.providers?.map((provider) => (
                      <Typography key={provider}> {provider} </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))

          : allPatient?.map((patient) => (

            <Grid item xs={4}>
              <Card
                style={{ cursor: "pointer" }}
                className={classes.root}
                key={patient.id}
                onClick={() => goToPatientDetails(patient)}
              >
                {/* renders generate recs button only if no provider matches. need to fix so 
          it tells user if there are no matches */}
                {!patient.providers[0] && (
                  <Button
                    onClick={() => generateRecs(patient)}
                    variant="contained"
                    color="primary"
                  >
                    Generate Provider Recommendations
                  </Button>
                )}
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Patient ID: <section className="circle">{patient.id}</section>
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Recommendations(s):
                  </Typography>
                  {patient?.providers?.map((provider) => (
                    <Typography key={provider}> {provider} </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Fab
        variant="extended"
        aria-label="Add Provider"
        className={classes.fab}
        color="primary"
        onClick={handleAddPatient}
      >
        <AddIcon className="extendedIcon" />
        Add Patient
      </Fab>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
        maxWidth={"xl"}
        fullWidth={"false"}
      >
        <AddPatient />
        <DialogActions>
          <Button onClick={handleCancel} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={confirmAdd} variant="contained" color="primary">
            Add Patient
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pop up on add patient if no tag is selected. */}
      <Dialog
        open={openError}
        onClose={handleCancelError}
        aria-labelledby="form-dialog-title"
        fullWidth={"false"}
      >
        <DialogTitle id="form-dialog-title" className="center">
          Oops!
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="center">
            Please make sure to select at least one specialty.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelError} variant="contained" color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
