// ⬇ What dependencies we need to import
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ⬇ What we are importing from Material-ui
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

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
export default function EditSpecialty({ showActive }) {
  // ⬇ What variables we need to declare
  const dispatch = useDispatch();
  // const classes = useStyles();


  // ⬇ What we are grabbing from the redux store
  const selected = useSelector((store) => store.editTag.selectTag);

  const [editTag, setEditTag] = useState(selected.name);
  // const edited = useSelector((store) => store.editTag.tagOnChange);

  const editTagOnChange = (event) => {
    setEditTag(event.target.value);
    dispatch({
      type: "TAG_ON_CHANGE",
      payload: { id: selected.id, name: event.target.value },
    });
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title" className="center container">
        Edit Specialty
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={() => editTagOnChange(event)}
          value={editTag}
          id="outlined-basic"
          label="Specialty name"
          className="center container"
          fullWidth
        />
      </DialogContent>
    </div>
  );
}
