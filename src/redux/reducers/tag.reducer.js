import { combineReducers } from 'redux';

// all tags in tags table
const allTags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS' :
            return action.payload;
        default :
            return state;
    }
}

// tags associated with one provider
const oneProviderTags = (state = [], action) => {
    switch(action.type) {
        case 'SET_PROVIDER_TAG':
            return action.payload;
        default :
            return state;
    }
}

export default combineReducers({
    allTags,
    oneProviderTags
});