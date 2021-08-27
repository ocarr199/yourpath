// ⬇ What dependencies we need to import
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ⬇ What custom components we need to import
import image from "../Images/YourPath_Logo_Text.png"
// ⬇ What we are importing from Material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from '@material-ui/core/TextField';

function RegisterForm() {
  // ⬇ What variables we need to declare
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();
  // ⬇ What we are grabbing from the redux store
  const errors = useSelector((store) => store.errors);
  
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        email: email,
        access_level: accessLevel
      },
    });

    setOpenAlert(true);
  }; // end registerUser

  const handleCloseAlert = () => {
    setOpenAlert(false);

    setUsername("");
    setPassword("");
    setEmail("");
    setAccessLevel("");
  };

  return (
    <div className="container center">
      <img src={image} alt="Your Path Logo" className=" landing-page center"/>
      <form className="formPanel" onSubmit={registerUser}>
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div>
          <TextField
            required
            label="Username"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
        <TextField
            required
            label="Email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
            <TextField
            required
            label="Temporary Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
        <TextField
            id="AccessLevel"
            label="Access Level"
            onChange={(event) => setAccessLevel(event.target.value)}
            value={accessLevel}
          />
        </div>
        <div className="margin-top">
        <Button type="submit" name="submit" value="Log In" variant="contained" color="primary">Register</Button>
      </div>
      </form>
      {/* Start MUI Alert Dialog */}
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have successfully registered a new user. A link has been sent
            to the email provided to reset the password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleCloseAlert} color="primary">
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      {/* End MUI Alert Dialog */}
    </div>
  );
}

export default RegisterForm;
