// ⬇ What dependencies we need to import
import { forwardRef } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import React, { useState } from "react";
// ⬇ What custom components we need to import
import rejectNonAdmin from "../RejectNonAdmin/RejectNonAdmin";
import PatchedPagination from "./PatchedPagination";
// ⬇ What we are importing from Material-ui
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
// ⬇ Icons for the material table
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import EditIcon from "@material-ui/icons/Edit";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
//import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

// ⬇ MUI Dialog
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

// ⬇ MUI Form
import { makeStyles } from "@material-ui/core/styles";

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function ProviderData() {
  // ⬇ What variables we need to declare
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [showActive, setShowActive] = useState(true);
  const access = rejectNonAdmin();

  // ⬇ must have or icons won't show up in table and it will look terrible
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  // ⬇ The columns for the DataGrid
  const columns = [
    {
      field: "program",
      title: "Program",
    },
    {
      field: "website",
      title: "Website",
    },
    {
      field: "address",
      title: "Address",
    },
    {
      field: "city",
      title: "City",
    },
    {
      field: "state",
      title: "State",

    },
    {
      field: "zip",
      title: "Zip",
    },
    {
      field: "county",
      title: "County",
    },
    {
      field: "email",
      title: "Email",
    },
    {
      field: "phone",
      title: "Phone Number",
    },
    {
      field: "parent_program",
      title: "Parent Program",
    },
    {
      field: "tags",
      title: "Specialties",
      render: rowData => rowData.tags.map(tag => (<p>{assignTags(tag)}</p> )) 
    },
  ];

  // ⬇ This function checks the value of the tags and renders them if they are present
  // ⬇ If they are not, we alert that there are no tags assigned
  const assignTags = (tagName) => {
    if (!tagName) {
      return 'No Specialties Assigned';
    } else {
      return tagName.name;
    }
  }

  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = useState(false);
  //MUI Dialog Start
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
    //MUI Dialog End
  

  // ⬇ on click of inactivate/activate, opens dialog form
  const [providerToToggle, setProviderToToggle] = useState();
  // ⬇ When the dialog opens, we set the provider to a local state, then ask for a confirmation
  const handleOpen = (idToActivate, activeStatus) => {
    setProviderToToggle({
      id: idToActivate,
      active: !activeStatus
    })
    setConfirm(true);
  };
  // ⬇ When the dialog is closed, we reset the local state
  const handleClose = () => {
    setConfirm(false);
    setProviderToToggle()
  };
  // ⬇ Upon Confirmation, the provider is dispatched to the server, the dialogue is closed, and set showActive is reset
  const handleToggle = (i) => {
    // ⬇ Initiate POST request to Activate
    dispatch({
      type: "TOGGLE_PROVIDER",
      payload: providerToToggle
    });
    setConfirm(false);
    setShowActive(!showActive);
  };

  // ⬇ Edit Provider Start
  const editProvider = useSelector((store) => store.editProviderReducer);
  const handleEditProvider = (event) => {
    event.preventDefault();
    // ⬇ Updates provider info in DB
    dispatch({ type: "CONFIRM_EDIT", payload: editProvider });
    handleClickClose();
  };

  // ⬇ Dispatches to reducer
  const handleEdit = (providerToEdit) => {
    handleClickOpen(providerToEdit);
    dispatch({ type: "EDIT_PROVIDER", payload: providerToEdit });
  };

  const handlePush = (providerDetail) => {
    history.push(`/providerDetail/${providerDetail.id}`);
    // ⬇ Sends details to reducer in case of Edit
    dispatch({ type: "EDIT_PROVIDER", payload: providerDetail });
  };

  const getActiveProviders = () => {
    // ⬇ Initiate GET request to grab all of the ACTIVE Providers
    dispatch({ type: "FETCH_PROVIDERS" });
    setShowActive(true);
  };

  const handleEditChange = (event) => {
    dispatch({
      type: "EDIT_ON_CHANGE",
      payload: { key: event.target?.name, value: event.target?.value },
    });
  };

  const getDeactivatedProviders = () => {
    console.log("clicked see deactivated");
    // ⬇ Initiate GET request to grab all of the deactivated Providers
    dispatch({ type: "FETCH_DEACTIVATED" });

    setShowActive(false);
  };

  // ⬇ This data is all of the Providers
  const data = useSelector((store) => store.provider.allProviders);

  // ⬇ The total number of data rows
  const All = data.length;

  // ⬇ The options or settings for our Material Table
  const options = {
    search: true,
    exportButton: true,
    filtering: true,
    // fixedColumns: {
    //   left: 1
    // },
    paging: true,
    pageSize: 5, // make initial page size
    emptyRowsWhenPaging: true, //to make page size fix in case of less data rows
    pageSizeOptions: [5, 10, 30, 50, All], // rows selection options
    // tableLayout: 'fixed','
  };

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          showActive ? getDeactivatedProviders() : getActiveProviders();
        }}
      >
        {showActive ? "See Deactivated Providers" : "See Active Providers"}
      </Button>
      <div>
        {/* <div style={{ maxWidth: '100%' }}> */}
        <MaterialTable
          components={{
            // fixes deprecated code in material-table
            Pagination: PatchedPagination,
          }}
          title={showActive ? "Active Providers" : "Deactivated Providers"}
          columns={columns}
          data={data}
          options={options}
          icons={tableIcons}
          actions={
            access
              ? showActive
                ? [
                    {
                      icon: EditIcon,
                      tooltip: "Edit Provider",
                      onClick: (event, rowData) => {
                        handleEdit(rowData);
                      },
                    },
                    {
                      icon: RemoveCircleOutlineIcon,
                      tooltip: "Deactivate Provider",
                      onClick: (event, rowData) => {
                        handleOpen(rowData.id, rowData.active);
                      },
                    },
                    {
                      icon: ViewColumn,
                      tooltip: "View Provider",
                      onClick: (event, rowData) => {
                        handlePush(rowData);
                      },
                    },
                  ]
                : [
                    {
                      icon: EditIcon,
                      tooltip: "Edit Provider",
                      onClick: (event, rowData) => {
                        handleEdit(rowData);
                      },
                    },
                    {
                      icon: PowerSettingsNewIcon,
                      tooltip: "Activate Provider",
                      onClick: (event, rowData) => {
                        handleOpen(rowData.id, rowData.active);
                      },
                    },
                    {
                      icon: ViewColumn,
                      tooltip: "View Provider",
                      onClick: (event, rowData) => {
                        handlePush(rowData);
                      },
                    },
                  ]
              : [
                  {
                    icon: ViewColumn,
                    tooltip: "View Provider",
                    onClick: (event, rowData) => {
                      handlePush(rowData);
                    },
                  },
                ]
          }
        />
      </div>
      {/* Start MUI EDIT Dialog */}
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="center">
          Edit Provider Here:
        </DialogTitle>
        <DialogContent>
          <div className="center">
            <form className={classes.root} noValidate autoComplete="off">
              {/* Program Input Field */}
              <TextField
                name="program"
                id="Program"
                label="Program"
                multiline
                maxRows={4}
                onChange={handleEditChange}
                value={editProvider.program}
              />
              {/* Website Input Field */}
              <TextField
                name="website"
                id="Website"
                label="Website"
                onChange={handleEditChange}
                value={editProvider.website}
              />
              {/* Address Input Field */}
              <TextField
                name="address"
                id="Address"
                label="Address"
                onChange={handleEditChange}
                value={editProvider.address}
              />
              {/* City Input Field */}
              <TextField
                name="city"
                id="City"
                label="City"
                onChange={handleEditChange}
                value={editProvider.city}
              />
              {/* State Input Field */}
              <TextField
                name="state"
                id="State"
                label="State"
                onChange={handleEditChange}
                value={editProvider.state}
              />
              {/* Zip Input Field */}
              <TextField
                name="zip"
                id="Zip"
                label="Zip"
                onChange={handleEditChange}
                value={editProvider.zip}
              />
              {/* County Input Field */}
              <TextField
                name="county"
                id="County"
                label="County"
                onChange={handleEditChange}
                value={editProvider.county}
              />
              {/* Email Input Field */}
              <TextField
                name="email"
                id="Email"
                label="Email"
                onChange={handleEditChange}
                value={editProvider.email}
              />
              {/* Phone Input Field */}
              <TextField
                name="phone"
                id="Phone"
                label="Phone"
                onChange={handleEditChange}
                value={editProvider.phone}
              />
              {/* Parent Program Input Field */}
              <TextField
                name="parent_program"
                id="Parent_program"
                label="Parent Program"
                onChange={handleEditChange}
                value={editProvider.parent_program}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditProvider} color="primary">
            Submit Changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* End MUI EDIT Dialog */}
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will change the active status of this provider.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleToggle} color="primary" autoFocus>
            Yes, Change
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
