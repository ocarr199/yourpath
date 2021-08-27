// ⬇ What dependencies we need to import
import { useState } from "react";
import { useDispatch } from "react-redux";
// ⬇ What we are importing from Material-ui
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";

export default function({ classes, provider, providerTag }) {
  // ⬇ What variables we need to declare
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    setOpen(false)
    dispatch({ type: "DELETE_RECOMMENDATION", payload: provider });
  };
  
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {provider.program}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Parent Program: {provider.parent_program}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Address: {provider.address} {provider.city},{" "}
            {provider.state}, {provider.zip}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            County: {provider.county}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Phone: {provider.phone}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Email: {provider.email}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Website:{" "}
            <a href={provider.website}> {provider.website} </a>
          </Typography>
          {providerTag.map((tag, i) => (
            <Chip key={i} label={tag} className={classes.chip} />
          ))}
        </CardContent>
        <CardActions className="center">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleOpen}
          >
            Remove Provider
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will permanently remove this provider from this client. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

