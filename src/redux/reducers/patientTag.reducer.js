// stores tags while adding tags to a new patient
const patientTagReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TAG' :
            console.log('state in patientTagReducer', state);
            return [...state, action.payload];
        case 'DELETE_TAG' :

            // removes deselected tag from reducer
            let newState = state.filter(tag => tag.tag_id != action.payload.delete_id)
            console.log('newState', newState);
            return newState;
        case 'CLEAR_PATIENT_TAGS':
            return [];
        default :
            return state;
    }
}

export default patientTagReducer;