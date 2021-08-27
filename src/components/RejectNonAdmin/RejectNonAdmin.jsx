import { useSelector } from "react-redux";

function rejectNonAdmin() {
    const user = useSelector(state => state.user) ;

    if( user.access_level >= 100 ) {
        return true;
    } else {
        return false;
    }
}

export default rejectNonAdmin;