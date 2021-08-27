// ⬇ What dependencies we need to import
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
// ⬇ What we are importing from Material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

function LoginForm() {
  // ⬇ What variables we need to declare
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // ⬇ What we are grabbing from the redux store
  const errors = useSelector(store => store.errors);
  

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div className="margin-top">
        <Button type="submit" name="submit" value="Log In" variant="contained" color="primary">Log In</Button>
      </div>
    </form>
  );
}

export default LoginForm;
