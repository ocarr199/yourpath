// ⬇ dependencies we need to import
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// ⬇ custom components we need to import
import Chip from "@material-ui/core/Chip";

// ⬇ located inside of AddPatient component
function AddPatientChip({ tag, classes }) {

    const dispatch = useDispatch();

    // ⬇ local state for selected and deselected chip color
    const [chipColor, setChipColor] = useState('default');

    // ⬇ on click of chip
    const handleChipClick = () => {
        console.log('tag.id', tag.id);
        // if clicking on an unselected chip (grey color), sets color to primary
        // and dispatches that single tag id to reducer
        if (chipColor == 'default') {
            setChipColor('primary');
            dispatch({
                type: 'ADD_TAG',
                payload: {tag_id: tag.id}
            })
            // if clicking on selected chip (primary color), sets color to default
            // and deletes that single tag id from reducer
        } else if (chipColor == 'primary') {
            setChipColor('default');
            dispatch({
                type: 'DELETE_TAG',
                payload: {delete_id: tag.id}
            })
        }
    }

    return (
        <>
            <li
                key={tag.id}
                onClick={handleChipClick}
            >
                <Chip
                    color={chipColor}
                    value={tag.id}
                    label={tag.name}
                    className={classes.chip}
                ></Chip>
            </li>

        </>
    )
}

export default AddPatientChip;