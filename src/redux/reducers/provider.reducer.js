import { combineReducers } from "redux";

const allProviders = (state = [], action) => {
    switch(action.type) {
        case "SET_PROVIDERS" :
            return action.payload;
        case 'CLEAR_PROVIDERS':
            return [];
        default :
            return state;
    }
}

const providerDetails = (state = {}, action) => {
    switch(action.type) {
        case "SET_PROVIDER_DETAIL" :
            return action.payload[0];
        default :
            return state;
    }
}

export default combineReducers({
    allProviders,
    providerDetails
}) ;