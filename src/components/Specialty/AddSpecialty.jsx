// ⬇ What dependencies we need to import
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ⬇ What we are importing from Material-ui
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "right",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

// located inside of Specialty component
export default function AddSpecialty() {
    // ⬇ What variables we need to declare
    const [newTag, setNewTag] = useState('')
    const dispatch = useDispatch();

    const nameTag = (action) => {
        setNewTag(event.target.value)
        dispatch({type: 'NEW_TAG_ON_CHANGE', payload: event.target.value})
    }

    return (
        <div>
            <DialogTitle id="alert-dialog-title" className="center container">{"Add Specialty"} </DialogTitle>
                <DialogContent className="center container">
                <TextField value={newTag} onChange={nameTag} id="outlined-basic" label="Specialty Name" variant="outlined" className="center"/>
                   
                </DialogContent>
        </div>
    )
}
