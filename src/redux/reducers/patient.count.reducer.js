const patient = (state = [], action) => {
    switch (action.type) {
      case 'SET_PATIENT_COUNT' :
        return action.payload
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default patient;