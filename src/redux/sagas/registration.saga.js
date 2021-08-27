import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const nodemailer = require('nodemailer');

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  

  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });


    //??
    //probably not going to want to login after they register if Jordan is making a new user
    //However, after we reset the password, we might want them to login ???

    //TODO - Reset Password
    //Get front end component made
    //Node Mailer ?


    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* resetPassword(action) {

  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and new password from the payload to the server
    yield axios.put('/api/user/newPassword', action.payload);

    // // automatically log a user in after registration
    // yield put({ type: 'LOGIN', payload: action.payload });


  } catch (error) {
    console.log('Error with user reset password:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('RESET_PASSWORD', resetPassword)
}

export default registrationSaga;
