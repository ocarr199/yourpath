// ⬇ What dependencies we need to import
import React from 'react';
import clsx from 'clsx';
// ⬇ What custom components we need to import
import './SideNav.css'
import rejectNonUser from "../RejectNonAdmin/RejectNonUser";
// ⬇ What we are importing from Material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/Category';
import { useDispatch } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import image from '../Images/YourPath_Main_Logo.png';


const drawerWidth = 240;
// #4A4A4A
// Light Teal: #4AAC8F
// Medium Teal: #219774
// Teal: #165A4A
// Navy Blue: #0B3943 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#219774'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function SideNav(props) {
  const access = rejectNonUser();
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  //userSelector -> check the user

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      > 
        {access ? (
          <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
        </Toolbar>
        ) : (
          <Toolbar>
        </Toolbar>
        )}
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <img
              className="drawer-img"
              width="80%"
              src={image}
              alt="logo"
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <Link
              to="/home"
              style={{ textDecoration: 'none', color:"#4A4A4A" }}
              className="navigationName"
              >
                 <ListItem
                 button >
                     <ListItemIcon> <HomeIcon /></ListItemIcon>
                     <ListItemText
                   
                     primary={"Home"} />
                 </ListItem>
            </Link>
 
            <Link
            style={{ textDecoration: 'none', color:"#4A4A4A" }}
            to="/provider">
                 <ListItem button >
                    <ListItemIcon> <LocalHospitalIcon /> </ListItemIcon>
                    <ListItemText primary={"Providers"} />
                 </ListItem>
            </Link>

            <Link 
            style={{ textDecoration: 'none', color:"#4A4A4A" }}
            to="/patient">
                <ListItem button >
                    <ListItemIcon><PersonIcon /> </ListItemIcon>
                     <ListItemText primary={"Patients"} />
                </ListItem>
            </Link>

            <Link 
            style={{ textDecoration: 'none', color:"#4A4A4A" }}
            to="/specialties">
                <ListItem button >
                    <ListItemIcon> <CategoryIcon /> </ListItemIcon>
                     <ListItemText primary={"Specialties"} />
                </ListItem>
            </Link>

            <Link 
            style={{ textDecoration: 'none', color:"#4A4A4A" }}
            to="/admin">
                <ListItem button >
                    <ListItemIcon> <GroupIcon /> </ListItemIcon>
                     <ListItemText primary={"Team"} />
                </ListItem>
            </Link>
 

            <ListItem button 
            onClick={() => dispatch({ type: 'LOGOUT' })}
            >
            <ListItemIcon>< ExitToAppIcon /></ListItemIcon>
                     <ListItemText
                     style={{ textDecoration: 'none', color:"#4A4A4A" }}
                     primary={"Log Out"} />
            </ListItem>

        </List>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {props.children}
      </main>
    </div>
  );
}
