// ⬇ What dependencies we need to import
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
// ⬇ What custom components we need to import
import AddEditProviderChips from './AddEditProviderChips';
import rejectNonAdmin from "../RejectNonAdmin/RejectNonAdmin";
// ⬇ What we are importing from Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";


// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
    maxWidth: 500,
  },
  rootForm: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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
  paperRoot: {
    display: "flex",
    justifyContent: "right",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
}));

export default function ProviderDetail() {
  // ⬇ What variables we need to declare
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const history = useHistory();
  const access = rejectNonAdmin();
  // ⬇ What we are grabbing from the redux store
  const provider = useSelector((store) => store.provider.providerDetails);
  const providerTags = useSelector((store) => store.tag.oneProviderTags);
  const editProvider = useSelector((store) => store.editProviderReducer);

  // ⬇Start Open and Close Dialogs
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  // ⬇ on click of edit, opens edit pop up form
  const handleOpenEdit = () => {
    setOpen(true);
  };
  const handleCloseEdit = () => {
    setOpen(false);
  };
  const handleStartAlert = () => {
    console.log("In handle Start Alert");
    handleCloseEdit();
    handleOpenAlert();
  };
  //End Open and Close Dialogs

  // ⬇ Grabbing the patient's id inside the url
  const { id } = useParams();
  // ⬇ On page load, fetch the patient information
  useEffect(() => {
    // ⬇ Grab this provider details
    dispatch({ type: "FETCH_PROVIDER_DETAIL", payload: { id: id } });
    dispatch({ type: "FETCH_PROVIDER_TAG", payload: { id: id } });
    //dispatch({ type: "EDIT_PROVIDER", payload: provider });
    console.log('Provider is', id)
    console.log("Provider is", provider.id);
  }, []);

  // ⬇ Start Edit Provider

  const handleEditChange = (event) => {
    dispatch({
      type: "EDIT_ON_CHANGE",
      payload: { key: event.target?.name, value: event.target?.value },
    });
  };
  
  const handleEditProvider = (event) => {
    event.preventDefault();
    //Updates provider info in DB
    dispatch({ type: "CONFIRM_EDIT", payload: editProvider });
    handleCloseAlert();

  };
  //END Edit Provider

  return (
    <div className="container">
      <h1 className="center">Provider Detail</h1>
      <Grid
        container
        spacing={0}
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {provider.program}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Parent Program: {provider.parent_program}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Address: {provider.address} {provider.city}, {provider.state},{" "}
                {provider.zip}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                County: {provider.county}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Phone: {provider.phone}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Email: {provider.email}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Website: <a href={provider.website}> {provider.website} </a>
              </Typography>
              {providerTags.map((tag) => (
                <Chip key={tag.id} label={tag.name} className={classes.chip} />
              ))}
            </CardContent>
            <CardActions>
              {access ? (
                <Button
                  variant="contained"
                  color="secondary"
                  className="float-right"
                  startIcon={<EditIcon />}
                  onClick={handleOpenEdit}
                >
                  Edit
                </Button>
              ) : (
                <></>
              )}

              {access ? (
                <AddEditProviderChips providerId={id} providerTags={providerTags} />
              ) : (
                <></>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Start MUI Alert Dialog */}
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            This will permanently edit this provider.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditProvider} color="primary" autoFocus>
            Yes, Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* End MUI Alert Dialog */}
      {/* Start MUI EDIT Dialog */}
      <Dialog
        open={open}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="center">
          Edit Provider Here:
        </DialogTitle>
        <DialogContent>
          <form className={classes.rootForm} noValidate autoComplete="off">
            {/* Program Input Field */}
            <TextField
              name="program"
              id="Program"
              label="Program"
              onChange={handleEditChange}
              value={editProvider.program}
            />
            {/* Website Input Field */}
            <TextField
              name="website"
              id="Website"
              label="Website"
              onChange={handleEditChange}
              value={editProvider.website}
            />
            {/* Address Input Field */}
            <TextField
              name="address"
              id="Address"
              label="Address"
              onChange={handleEditChange}
              value={editProvider.address}
            />
            {/* City Input Field */}
            <TextField
              name="city"
              id="City"
              label="City"
              onChange={handleEditChange}
              value={editProvider.city}
            />
            {/* State Input Field */}
            <TextField
              name="state"
              id="State"
              label="State"
              onChange={handleEditChange}
              value={editProvider.state}
            />
            {/* Zip Input Field */}
            <TextField
              name="zip"
              id="Zip"
              label="Zip"
              onChange={handleEditChange}
              value={editProvider.zip}
            />
            {/* County Input Field */}
            <TextField
              name="county"
              id="County"
              label="County"
              onChange={handleEditChange}
              value={editProvider.county}
            />
            {/* Email Input Field */}
            <TextField
              name="email"
              id="Email"
              label="Email"
              onChange={handleEditChange}
              value={editProvider.email}
            />
            {/* Phone Input Field */}
            <TextField
              name="phone"
              id="Phone"
              label="Phone"
              onChange={handleEditChange}
              value={editProvider.phone}
            />
            {/* Parent Program Input Field */}
            <TextField
              name="parent_program"
              id="Parent_program"
              label="Parent Program"
              onChange={handleEditChange}
              value={editProvider.parent_program}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStartAlert} color="primary">
            Submit Changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* End MUI EDIT Dialog */}
    </div>
  );
}
