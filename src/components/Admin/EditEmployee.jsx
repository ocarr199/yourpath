// ⬇ What dependencies we need to import
import React from "react";
// ⬇ What we are importing from Material-ui
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Popover from "@material-ui/core/Popover";
import { Typography } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function EditEmployee({
  username,
  setUsername,
  accessLevel,
  setAccessLevel,
}) {
  // ⬇ What variables we need to declare
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DialogTitle id="alert-dialog-title" className="center">
        {"Edit Employee"}
      </DialogTitle>
      <DialogContent className="center">
        {/* <h1>Edit Employee</h1> */}
        <form className={classes.root} noValidate autoComplete="off">
          {/* Username Input Field */}
          <TextField
            id="Username"
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
            onClick={handleClick}
            value={username}
            variant="outlined"
          />
          {/* Access Level Input Field */}

          <TextField
            id="AccessLevel"
            label="Access Level"
            onChange={(event) => setAccessLevel(event.target.value)}
            value={accessLevel}
            onClick={handleClick}
            variant="outlined"
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography>
              <div className="popover center">
                <h3 fontWeight="fontWeightBold" className="center">
                  Access Levels:
                </h3>
                <ul>
                  <li>Lower Level: 1-99</li>
                  <li>Higher Level: 100+ </li>
                </ul>
              </div>
            </Typography>
          </Popover>
        </form>
      </DialogContent>
    </>
  );
}
