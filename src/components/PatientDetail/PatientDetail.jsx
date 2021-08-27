// ⬇ What dependencies we need to import
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
const { v4 } = require("uuid");
// ⬇ What custom components we need to import
import CardItem from "./PatientDetailsCard.jsx";
import PatientMap from "../PatientMap/PatientMap";
import rejectNonAdmin from "../RejectNonAdmin/RejectNonAdmin";
// ⬇ What we are importing from Material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
    maxWidth: 500,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function PatientDetail() {
  // ⬇ What variables we need to declare
  const classes = useStyles();
  const token = v4();
  const dispatch = useDispatch();
  const access = rejectNonAdmin();
  // ⬇ Grabbing the patient's id inside the url
  const { id } = useParams();
  // ⬇ local state for open or closed status of confirming activation
  const [confirm, setConfirm] = useState(false);
  // ⬇ What we are grabbing from the redux store
  const patient = useSelector((store) => store.patient.onePatientProviders); // stores providers associated with ONE patient
  const allPatient = useSelector((store) => store.patient.allPatients);

  // ⬇ On page load, fetch the patient information
  useEffect(() => {
    dispatch({ type: "FETCH_PATIENT_DETAIL", payload: { id }.id });
    dispatch({ type: "FETCH_ALL_PATIENT", payload: { active: true } });
  }, []);

  // ⬇ State variable for Alert Dialog
  const [open, setOpen] = useState(false);
  // ⬇ Open Alert
  const handleClickOpenAlert = () => {
    setOpen(true);
  };
  // ⬇ Close Alert
  const handleCloseAlert = () => {
    setOpen(false);
  };

  const handleToggleActive = () => {
    dispatch({
      type: "CHANGE_PATIENT_ACTIVE_STATUS",
      payload: { id: id, active: patient[0]?.active },
    });
    handleClose();
  };

  const generateURL = () => {
    dispatch({ type: "ADD_TOKEN", payload: { id: { id }.id, token: token } });
    // ⬇ Open alert dialog to notify user of url copy to clipboard
    handleClickOpenAlert();
    navigator.clipboard.writeText(
      `http://localhost:3000/#/patientDetail/recommendation/${id}/${token}`
    );
  };

  // ⬇ on click of inactivate/activate, open/closes dialog form
  const handleOpen = () => {
    setConfirm(true);
  };
  const handleClose = () => {
    setConfirm(false);
  };

  return (
    <div className="container">
      {/* Will need to change this using useParams once Owen's section is done */}
      {allPatient.filter((patient) => patient.id == id)[0]?.active ? (
        <h1 className="center">Patient {id}</h1>
      ) : (
        <h1 className="center">Patient {id} (inactive)</h1>
      )}
      {/* couldn't figure out how to get rid of optional chaining without error below */}
      {access ? (
        allPatient.filter((patient) => patient.id == id)[0]?.active ? (
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Mark Inactive
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Mark Active
          </Button>
        )
      ) : (
        <></>
      )}
      
      <div>
        <h3 className="center">Patient Requirements</h3>
        {allPatient
          .filter((patient) => patient.id == id)
          .map((patient) =>
            patient.tags.map((tag, i) => (
              <Chip key={i} label={tag} className={classes.chip} />
            ))
          )}
          <Button
        variant="contained"
        color="primary"
        className="float-right"
        onClick={generateURL}
      >
        Generate URL
      </Button>
      </div>
      
      <div className="float-container">
        <div className="float-child">
          {patient.map((recommendation) => (
            <CardItem
              classes={classes}
              key={recommendation.id}
              provider={recommendation}
              providerTag={recommendation.tags}
            />
          ))}
        </div>
        <div className="float-child">
          <PatientMap patient={patient} />
        </div>
      </div>

      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will change the active status of this client.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleToggleActive} color="primary" autoFocus>
            Yes, Change
          </Button>
        </DialogActions>
      </Dialog>
      {/* Start MUI Alert Dialog */}
      <Dialog
        open={open}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Copied!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The URL has been copied to your clipboard!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* End MUI Alert Dialog */}
    </div>
  );
}
