const editProviderReducer = (state = {}, action) => {
    switch (action.type) {
        //Sets colony as object to be edited
        case 'EDIT_PROVIDER':
            return action.payload;
        case 'EDIT_ON_CHANGE':
            return {...state, [action.payload.key]: action.payload.value};
        case 'CLEAR_EDIT':
            return {};
        case 'FETCH_EDIT':
            return state;
        default:
            return state;
    }
}

export default editProviderReducer;