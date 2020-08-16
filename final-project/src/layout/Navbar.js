import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { UserContext } from "../context/UserContext";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import ImageSearchOutlinedIcon from "@material-ui/icons/ImageSearchOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ViewListOutlinedIcon from "@material-ui/icons/ViewListOutlined";
import SportsEsportsOutlinedIcon from "@material-ui/icons/SportsEsportsOutlined";

const useStylesList = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  menuButton2: {
    marginLeft: theme.spacing(6),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classesList = useStylesList();
  const [open1, setOpen1] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

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
          <Link to={"/"}>
            <IconButton
              className={classes.menuButton2}
              color="inherit"
              aria-label="open drawer"
              edge="start"
            >
              <HomeIcon style={{ color: "white" }} fontSize="large" />
            </IconButton>
          </Link>
          <Typography variant="h6" noWrap></Typography>
        </Toolbar>
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
          <Logo />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List component="nav" aria-labelledby="nested-list-subheader">
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Beranda" />
            </ListItem>
          </Link>
          <ListItem button onClick={handleClick1}>
            <ListItemIcon>
              <MovieCreationOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Movie" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/moviehome">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <MovieCreationOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Movie List" />
                </ListItem>
              </Link>
              <Link to="/movietable">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ImageSearchOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Movie Tabel" />
                </ListItem>
              </Link>
              <Link to="/movieform">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ViewListOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Movie Form" />
                </ListItem>
              </Link>
              <Link to="/moviecreate">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AddOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Movie Create" />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <ListItem button onClick={handleClick2}>
            <ListItemIcon>
              <SportsEsportsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Game" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/gamehome">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Game List" />
                </ListItem>
              </Link>
              <Link to="/gametable">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ImageSearchOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Game Tabel" />
                </ListItem>
              </Link>
              <Link to="/gameform">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ViewListOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Game Form" />
                </ListItem>
              </Link>
              <Link to="/gamecreate">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AddOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Game Create" />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          {user && (
            <li>
              <a style={{ cursor: "pointer" }} onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                  <ListItemText primary="Logout" />
                </ListItemIcon>
              </a>
            </li>
          )}
          {user && (
            <Link to={"./changepass"}>
              <ListItemIcon>
                <ExitToAppIcon />
                <ListItemText primary="Ganti Password" />
              </ListItemIcon>
            </Link>
          )}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
