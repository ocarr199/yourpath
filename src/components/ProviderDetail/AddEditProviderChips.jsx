// ⬇ What dependencies we need to import
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ⬇ What custom components we need to import
import ProviderChip from './ProviderChip'
// ⬇ What we are importing from Material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CategoryIcon from '@material-ui/icons/Category';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    paperRoot: {
        display: "flex",
        justifyContent: "right",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
    },
}));

export default function AddProviderChip({ providerId, providerTags }) {
    // ⬇ What variables we need to declare
    const classes = useStyles();
    const dispatch = useDispatch();
    // state for add specialties form
    const [open, setOpen] = useState(false);
    // state for confirm add specialties dialog
    const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
    // state for edit specialties form
    const [openEdit, setOpenEdit] = useState(false);
    // state for confirm edit specialties dialog
    const [openAlert, setOpenAlert] = useState(false);

    // ⬇ What we are grabbing from the redux store
    const tags = useSelector((store) => store.tag.allTags);
    const selectedTags = useSelector((store) => store.providerTag);
    
    useEffect(() => {
        dispatch({ type: "FETCH_TAGS" });
    }, []);

    // ⬇ open add specialty form
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch({ type: 'CLEAR_PROVIDER_TAGS' })
    };

    // ⬇ sends selected or deselected tags to reducer in add specialties dialog
    const handleSelectTags = (tag) => {
        // dispatch({ type: 'CLEAR_PROVIDER_TAGS'})
        if (selectedTags.includes(tag.id)) {
            dispatch({ type: 'DELETE_PROVIDER_TAG', payload: tag.id })
        } else {
            dispatch({ type: 'ADD_PROVIDER_TAG', payload: tag.id })
        }
    };

    // ⬇ sends all selected tags to database on confirm of addtags
    const addTags = () => {
        dispatch({
            type: 'ADD_PROVIDER_TAGS', payload: { tagArray: selectedTags, id: providerId }
        })
        setOpenConfirmAdd(false);
        dispatch({ type: 'CLEAR_PROVIDER_TAGS' })
    }

    // ⬇ open confirmation dialog for add specialty
    const startConfirmDialogAdd = () => {
        setOpenConfirmAdd(true);
        setOpen(false);
    }

    const closeConfirmDialogAdd = () => {
        setOpenConfirmAdd(false);
    }

    //! FUNCTIONS BELOW ARE FOR EDIT SPECIALTIES
    // ⬇ fires on open of edit specialties
    const openEditSpecialties = () => {
        setOpenEdit(true);
        // ⬇ put existing tags into reducer (providerTags are existing tags for this provider)
        for (let eachTag of providerTags) {
            dispatch({ type: 'ADD_PROVIDER_TAG', payload: eachTag.tag_id })
        }
    }

    const closeEdit = () => {
        setOpenEdit(false)
    }

    // ⬇ fires on confirmation of edit tags selection
    const editTags = () => {
        dispatch({
            type: 'EDIT_PROVIDER_TAGS', payload: { tagArray: selectedTags, id: providerId }
        })
        setOpenAlert(false);
        dispatch({ type: 'CLEAR_PROVIDER_TAGS' })
    }

    // ⬇ Start Open and Close Confirmation dialogs for edit provider
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    // ⬇ opens confirmation dialog for edit
    const handleStartAlert = () => {
        setOpenEdit(false);
        setOpenAlert(true);
    }

    return (
        <div>
            {/* shows button to add specialties only if provider does not already have specialties */}
            {providerTags.length ?
                <Button
                    variant="contained"
                    className="float-right"
                    color="primary"
                    startIcon={<CategoryIcon />}
                    onClick={openEditSpecialties}>
                    Edit Specialties
                </Button>
                :
                <Button
                    variant="contained"
                    className="float-right"
                    color="primary"
                    startIcon={<CategoryIcon />}
                    onClick={handleClickOpen}>
                    Add Specialties
                </Button>
            }
            {/* EDIT specialties form dialog */}
            <Dialog
                open={openEdit}
                //TransitionComponent={Transition}
                keepMounted
                maxWidth={'xl'}
                fullWidth={'false'}
                onClose={closeEdit}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Edit Specialties</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Paper component="ul" className={classes.paperRoot}>
                            <Grid container className={classes.root} spacing={2}>
                                {tags.map((tag, i) => {
                                    return (
                                        <Grid item xs={3}>
                                            <ProviderChip clickable={true} key={i} handleSelectTags={handleSelectTags} tag={tag} selectedTags={selectedTags} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Paper>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEdit} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleStartAlert} color="primary">
                        Submit Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation dialog for edit specialties */}
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will permanently edit this provider's specialties and will not re match providers to patients based on this change.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAlert} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={editTags} color="primary" autoFocus>
                        Yes, Edit
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End edit tag confirmation dialog */}

            {/* add specialties form dialog */}
            <Dialog
                open={open}
                //TransitionComponent={Transition}
                keepMounted
                maxWidth={'xl'}
                fullWidth={'false'}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Select Specialties</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Paper component="ul" className={classes.paperRoot}>
                            <Grid container className={classes.root} spacing={2}>
                                {tags.map((tag, i) => {
                                    return (
                                        <Grid item xs={3}>
                                            <ProviderChip clickable={true} key={i} handleSelectTags={handleSelectTags} tag={tag} selectedTags={selectedTags} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Paper>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={startConfirmDialogAdd} color="primary">
                        Add Specialties
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation dialog for add specialties */}
            <Dialog
                open={openConfirmAdd}
                onClose={closeConfirmDialogAdd}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will add the selected specialties to the provider.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDialogAdd} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTags} color="primary" autoFocus>
                        Yes, Add
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End edit tag confirmation dialog */}

        </div>
    );
}
