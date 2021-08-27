import { combineReducers } from 'redux';

const onePatientProviders = (state = [], action) => {
    switch (action.type) {
      // providers for ONE patient
      case 'SET_PATIENT_DETAIL':
        console.log('patient reducer PATIENT_DETAIL', action.payload);
        return action.payload;
      default:
        return state;
    }
  }

// for ALL inactive or active patients, array with many patient objects
const allPatients = (state = [], action) => {
  switch(action.type) {
    case 'SET_ALL_PATIENT':
      console.log('patient reduce ALL_PATIENT', action.payload);
      return action.payload
    default:
      return state;
  }
}

const allDeactive = (state = [], action) => {
  switch(action.type) {
    case 'SET_ALL_DEACTIVE':
      console.log('patient reduce deactivated patients', action.payload);
      return action.payload
    default:
      return state;
  }
}

const patientMap = (state = [], action) => {
  switch(action.type) {
    case 'SET_PATIENT_MAP':
      console.log('patient reduce PATIENT_MAP', action.payload);
      return action.payload
    default:
      return state;
  }
}



  
  // user will be on the redux state at:
  // state.user
  export default combineReducers({
    onePatientProviders,
    allPatients, 
    patientMap,
    allDeactive,
  });