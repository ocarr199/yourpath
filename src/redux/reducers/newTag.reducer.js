const newTag = (state = {}, action) => {
    switch (action.type) {
        case 'NEW_TAG_ON_CHANGE' :
            return action.payload;
        default :
            return state;
    }
}

export default newTag;