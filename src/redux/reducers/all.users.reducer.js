const allUsersReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_ALL_USERS" :
            return action.payload;
        default :
            return state;
    }
}

export default allUsersReducer;