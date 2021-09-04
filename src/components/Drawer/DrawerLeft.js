import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
// import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

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
    marginRight: theme.spacing(2),
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
    backgroundColor: theme.palette.primary.main,
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
  toolbarTitle: {
    // flex: 1,
    color: "#c3cfdd", // "white", // "#556cd6", // "black", // rgba(0, 0, 0, 0.54)
    // paddingLeft: "20px",
    fontWeight: "bold",
  },
  // link: {
  //   margin: theme.spacing(1, 1.5),
  // },
  // buttonLink: {
  //   margin: theme.spacing(.5),
  // },
}));

export default function DrawerLeft() {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  // const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#c3cfdd", // "white", // "#556cd6", // "black", // rgba(0, 0, 0, 0.54)
    paddingLeft: "20px",
    fontWeight: "bold",
    // display: "inline-flex",
    // minWidth: "56px",
    // flexShrink: 0
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
          <Typography variant="h6" noWrap className={classes.toolbarTitle}>
            Etao Software Solutions
          </Typography>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List
          component="nav"
          aria-labelledby="nested-list-subheader"

          // subheader={
          //   <ListSubheader
          //     style={linkStyle}
          //     component="div"
          //     id="nested-list-subheader"
          //   >
          //     Etao Software Solutions
          //     <InboxIcon
          //       style={linkStyle}
          //       title="Update Profile"
          //       // onClick={() => {
          //       //   handleClickOpenForm("update");
          //       // }}
          //     />
          //     <Divider />
          //   </ListSubheader>
          // }
          // className={classes.root}
        >
          {/* MY LIST */}
          <ListItem button title="Home">
            <InboxIcon />
            <a href="/" style={linkStyle} title="Home">
              Home
            </a>
          </ListItem>
          <Divider />
          <ListItem button title="Projects Section">
            <InboxIcon />
            <Link
              variant="button"
              color="primary"
              href="/#projects"
              style={linkStyle}
            >
              Projects
            </Link>
          </ListItem>
          <Divider />
          <ListItem button title="Technologies Section">
            <InboxIcon />
            <Link
              variant="button"
              color="primary"
              href="/#technologies"
              style={linkStyle}
            >
              Technologies
            </Link>
          </ListItem>
          <Divider />
          <ListItem button title="About Section">
            <InboxIcon />
            <Link
              variant="button"
              color="primary"
              href="/#about"
              style={linkStyle}
            >
              About
            </Link>
          </ListItem>
          <Divider />
          <ListItem button title="Testimonials Section">
            <InboxIcon />
            <Link
              variant="button"
              color="primary"
              href="/#testimonials"
              style={linkStyle}
            >
              Testimonials
            </Link>
          </ListItem>
          <Divider />
          <ListItem button title="Contact Section">
            <InboxIcon />
            <Link
              variant="button"
              color="primary"
              href="/contact_us"
              style={linkStyle}
            >
              Contact Us
            </Link>
          </ListItem>
          <Divider />
        </List>
        {/* <Divider /> */}
        {!cookies["user_name"] ? (
          <List>
            <ListItem>
              <Link
                variant="button"
                color="primary"
                href="/signup"
                style={linkStyle}
              >
                Register
              </Link>
            </ListItem>
            <Divider />
            <ListItem>
              <Link
                variant="button"
                color="primary"
                href="/signin"
                style={linkStyle}
              >
                Login
              </Link>
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem button title="Articles Section">
              <InboxIcon />
              <Link
                variant="button"
                color="primary"
                href="/articles"
                style={linkStyle}
              >
                Articles
              </Link>
            </ListItem>
            <Divider />
            <ListItem>
              <PowerSettingsNewIcon />
              <Link
                variant="button"
                color="primary"
                href="/"
                style={linkStyle}
                onClick={async (event) => {
                  event.preventDefault();

                  var confirm_box = window.confirm(
                    "Are you sure you want to log out !"
                  );

                  if (confirm_box === true) {
                    // logout user api call
                    // CSRF TOKEN
                    const csrftoken = Cookies.get("csrftoken");

                    const response = await fetch(
                      `http://localhost:8000/api/logout`,
                      {
                        method: "POST",
                        credentials: "include", // necessary if cookie - token is sent from backend
                        withCredentials: true,
                        headers: {
                          "Content-type": "application/json",
                          "X-CSRFToken": csrftoken,
                          // Authorization: "Bearer " + data.jwt, // no need here since it will be handled in the backend
                        },
                      }
                    );

                    const content = await response.json();
                    // console.log("LOGOUT : ", content);

                    if (content.message && content.message === "success") {
                      removeCookie("user_id");
                      removeCookie("jwt");
                      removeCookie("user_name");
                      removeCookie("user_email");
                      // router.push("/"); // only pushes to the url but not refresh
                      window.location.href = "/"; // with refresh
                      return true;
                    }
                  } else {
                    // console.log("Cancelled");
                    return false;
                  }
                }}
              >
                Logout
              </Link>
            </ListItem>
          </List>
        )}
      </Drawer>
    </div>
  );
}
