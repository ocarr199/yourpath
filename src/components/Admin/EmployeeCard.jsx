// ⬇ What dependencies we need to import
import { useDispatch} from "react-redux";
import { useState, useEffect } from "react";
// ⬇ What we are importing from Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { grey, red } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import EditEmployee from "./EditEmployee";
import Button from "@material-ui/core/Button";

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  inactive: {
    maxWidth: 345,
    backgroundColor: "grey",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#4974a5",
  },
  button: {
    float: "right",
  },
}));

export default function EmployeeCard({ employee }) {
  // ⬇ What variables we need to declare
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(employee.username);
  const [accessLevel, setAccessLevel] = useState(employee.access_level);
  // ⬇ local state for open or closed status of add patient pop up
  const [open, setOpen] = useState(false);
  // ⬇ local state for open or closed status of confirming deletion of the employee
  const [confirm, setConfirm] = useState(false);
  // ⬇ local state for color of employee card (deactivated employees should be greyed out)
  const [isDeactivated, setIsDeactivated] = useState(false);

  // Function to check the employee access level to ultimately change the color of the employee card
  const deactivated = (accessLevel) => {
    if (accessLevel === 0) {
      setIsDeactivated(true);
    } else {
      setIsDeactivated(false);
    }
  };

  // ⬇ On page load, fetch the patient information
  useEffect(() => {
    // ⬇ Run this function to change the color of the employee card if the employee is deactivated
    deactivated(employee.access_level);
  }, []);

  const userToEdit = {
    username: username,
    access_level: accessLevel,
    token: employee.token,
  };

  //This doesn't fully delete the user, it just sets the access level to 0 to deactivate it
  const handleDeactivate = () => {
    setIsDeactivated(true);

    dispatch({
      type: "EDIT_USER",
      payload: {
        username: employee.username,
        access_level: 0,
        token: employee.token,
      },
    });
    handleClose();
  };

  // on click of add patient, opens dialog form
  const handleEdit = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch({
      type: "EDIT_USER",
      payload: userToEdit,
    });

    setOpen(false);
  };

  // on click of inactivate/activate, opens dialog form
  const handleOpen = () => {
    setConfirm(true);
  };
  const handleClose = () => {
    setConfirm(false);
  };

  // Checks the accessLevel for the subheader
  const checkAccessLevel = (accessLevel) => {
    if (accessLevel === 0) {
      // setIsDeactivated(true);
      return "Deactivated Employee";
    } else if (accessLevel < 100) {
      return "Low-Level Employee";
    } else if (accessLevel >= 100) {
      return "High-Level Employee";
    }
  };

  return (
    <>
      <Card className={isDeactivated ? classes.inactive : classes.root}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>{employee.username[0]}</Avatar>
          }
          title={employee.username}
          subheader={checkAccessLevel(employee.access_level)}
          action={
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Access Level: {employee.access_level}
            <IconButton className={classes.button} onClick={handleOpen}>
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={open}
              onClose={handleCancel}
              aria-labelledby="form-dialog-title"
              maxWidth={"sm"}
              fullWidth={false}
            >
              <EditEmployee
                username={username}
                setUsername={setUsername}
                accessLevel={accessLevel}
                setAccessLevel={setAccessLevel}
              />
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </Typography>
        </CardContent>

        <Dialog
          open={confirm}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will change deactivate this employee.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeactivate} color="primary" autoFocus>
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </>
  );
}
