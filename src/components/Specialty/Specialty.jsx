// ⬇ What dependencies we need to import
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// ⬇ What custom components we need to import
import rejectNonAdmin from "../RejectNonAdmin/RejectNonAdmin";
// ⬇ What we are importing from Material-ui
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import AddSpecialty from "./AddSpecialty";
import EditSpecialty from "./EditSpecialty";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "right",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(1.5),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

function Specialties() {
  // ⬇ What variables we need to declare
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [showActive, setShowActive] = useState(true);
  const access = rejectNonAdmin();
  // ⬇ What we are grabbing from the redux store
  const tagList = useSelector((store) => store.tag.allTags);
  const newSpecialty = useSelector((store) => store.newTag);
  const edited = useSelector((store) => store.editTag.tagOnChange);
  const selected = useSelector((store) => store.editTag.selectTag);


  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
  }, []);

  const openAddDialog = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const confirmCreate = () => {
    dispatch({ type: "CREATE_TAG", payload: { name: newSpecialty } });
    setOpen(false);
  };

  const openEditDialog = (tag) => {
    dispatch({ type: "SELECT_TAG", payload: tag });
    setOpen2(true);
  };

  const confirmEdit = () => {
    dispatch({ type: "CONFIRM_TAG_EDIT", payload: edited });
    setOpen2(false);
  };

  const handleCancelEdit = () => {
    setOpen2(false);
  };

  const deactivateTag = () => {
    dispatch({ type: "DEACTIVATE_TAG", payload: selected });
    setOpen2(false);
  };

  const activateTag = () => {
    dispatch({ type: "ACTIVATE_TAG", payload: selected });
    setOpen2(false);
  };

  const viewActiveTags = () => {
    setShowActive(true);
  };

  // ⬇ toggles view to inactive patients
  const viewInactiveTags = () => {
    setShowActive(false);
  };

  return (
    <div className="container">
      <h1 className="center">Specialties Page</h1>
      {access ? (
        showActive ? (
          <Button
            variant="contained"
            color="primary"
            onClick={viewInactiveTags}
          >
            View Inactive Specialties
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={viewActiveTags}>
            View Active Specialties
          </Button>
        )
      ) : (
        <></>
      )}
      {access ? (
        <Paper component="ul" className={classes.root}>
          {tagList
            .filter((tag) => tag.active == showActive)
            .map((tag) => {
              return (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  className={classes.chip}
                  onClick={() => openEditDialog(tag)}
                />
              );
            })}
        </Paper>
      ) : (
        <h3>You don't have access to view this page</h3>
      )}

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
        maxWidth={"sm"}
        fullWidth={"false"}
      >
        <AddSpecialty />
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmCreate} color="primary">
            Add Specialty
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleCancelEdit}
        aria-labelledby="form-dialog-title"
        maxWidth={"sm"}
        fullWidth={"false"}
      >
        <EditSpecialty showActive={showActive} />
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmEdit} color="primary">
            Edit Specialty
          </Button>
          {showActive ? (
            <Button
              onClick={deactivateTag}
              color="secondary"
            >
              Deactivate
            </Button>
          ) : (
            <Button onClick={activateTag} color="secondary">
              Activate
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {access ? (
        <Fab
          variant="extended"
          aria-label="Add Provider"
          className={classes.fab}
          color="primary"
          onClick={openAddDialog}
        >
          <AddIcon className="extendedIcon" />
          Add Specialty
        </Fab>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Specialties;
