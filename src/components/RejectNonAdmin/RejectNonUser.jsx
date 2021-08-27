import { useSelector } from "react-redux";

function rejectNonUser() {
    const user = useSelector(state => state.user) ;

    if( user.id) {
        return true;
    } else {
        return false;
    }
}

export default rejectNonUser;