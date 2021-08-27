// ⬇ What dependencies we need to import
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ⬇ What custom components we need to import
import AddPatientChip from "./AddPatientChip";
// ⬇ What we are importing from Material-ui
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  paperRoot: {
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
  gridRoot: {
    flexGrow: 1,
  },
}));

export default function AddPatient() {
  // ⬇ What variables we need to declare
  const dispatch = useDispatch();
  const classes = useStyles();
  // ⬇ What we are grabbing from the redux store
  const tagList = useSelector((store) => store.tag.allTags);

  // ⬇ fetches all tags for add patient form on page load
  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
  }, []);

  return (
    <div>
      <DialogTitle id="form-dialog-title" className="center">
        Add Patient
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="center">
          Select each specialty that applies to this patient.
        </DialogContentText>
        <Paper component="ul" className={classes.paperRoot}>
          <Grid container className={classes.gridRoot} spacing={2}>
            {tagList.map((tag) => {
              return (
                <Grid item xs={3}>
                  <AddPatientChip tag={tag} key={tag.id} classes={classes} />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </DialogContent>
    </div>
  );
}
