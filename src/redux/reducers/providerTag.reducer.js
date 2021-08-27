// stores tags while adding tags to a provider
// array of numbers
const providerTagReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PROVIDER_TAG' :
            console.log('state in providerTagReducer', state); //log is delayed by one click
            return [...state, action.payload];
        case 'DELETE_PROVIDER_TAG' :
            // removes deselected tag from reducer
            let newState = state.filter(id => id != action.payload);
            console.log('newState in providerTagReducer', newState);
            return newState;
        case 'CLEAR_PROVIDER_TAGS':
            return [];
        default :
            return state;
    }
}

export default providerTagReducer;