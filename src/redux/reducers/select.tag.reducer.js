import { combineReducers } from 'redux';



const selectTag = (state = {}, action) => {
    switch (action.type) {
        case 'SELECT_TAG' :
            return action.payload;
        default :
            return state;
    }
}

const tagOnChange = (state = {}, action) => {
    switch (action.type) {
        case 'TAG_ON_CHANGE' :
            return action.payload;
        default :
            return state;
    }
}

  export default combineReducers({
selectTag,
tagOnChange
  });