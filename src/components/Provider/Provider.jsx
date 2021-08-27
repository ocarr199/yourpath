// ⬇ What dependencies we need to import
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// ⬇ What custom components we need to import
import rejectNonAdmin from "../RejectNonAdmin/RejectNonAdmin";
import AddProvider from "./AddProvider";
import ProviderData from "./ProviderData";
// ⬇ What we are importing from Material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

export default function Provider() {
  // ⬇ What variables we need to declare
  const classes = useStyles();
  const dispatch = useDispatch();
  const access = rejectNonAdmin();
  const [open, setOpen] = React.useState(false);

  // ⬇ On page load, fetch all of the providers from the database
  useEffect(() => {
    dispatch({ type: "FETCH_PROVIDERS" });
  }, []);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div>
            <h1 className="center">Providers</h1>
            <ProviderData  onClose={handleClose} />
            {/* Start MUI For New Provider Dialog */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title-new-provider" className="center">Add A New Provider Here:</DialogTitle>
                <DialogContent>
                    < AddProvider/>
                </DialogContent>
                <DialogActions>
        </DialogActions>
      </Dialog>
      {access ? (
        <Fab
        variant="extended"
        aria-label="Add Provider"
        className={classes.fab}
        color="primary"
        onClick={handleClickOpen}
      >
        <AddIcon className="extendedIcon"/>
        Add Provider
      </Fab>
      ) : (
        <>
        </>
      )}
      {/* End MUI For New Provider Dialog */}
      
    </div>
  );
}
