// ⬇ What dependencies we need to import
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// ⬇ What custom components we need to import
import image from "../Images/YourPath_Logo_Text.png"
// ⬇ What we are importing from Material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'


export default function NewPassword() {
  // ⬇ What variables we need to declare
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  // ⬇ What we are grabbing from the redux store
  const errors = useSelector((store) => store.errors);
  
  // ⬇ Dispatches changes to redux
  const resetPassword = () => {
    if (newPassword === confirmPassword) {
        dispatch({
            type: "RESET_PASSWORD",
            payload: { username: username, password: newPassword, token: token },
          });

          history.push('/success');
    } else {
        dispatch({ type: "PASSWORDS_MATCH" });
    }
  };

  return (
    <div className="container center">
      <img src={image} alt="Your Path Logo" className=" landing-page center"/>
      <form className="formPanel" onSubmit={resetPassword}>
        <h2>Reset Your Password</h2>
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
            label="Password"
            type="password"
            name="password"
            required
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            label="confirm-password"
            type="password"
            name="confirm-password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className="margin-top">
        <Button type="submit" name="submit" value="Log In" variant="contained" color="primary">Reset Password</Button>
      </div>
      </form>
    </div>
  );
}
