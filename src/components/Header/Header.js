import React from "react";
import { alpha, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import MenuIcon from "@material-ui/icons/Menu";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
// import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DrawerLeft from "../Drawer/DrawerLeft";
import Link from "@material-ui/core/Link";
import { DiCssdeck } from "react-icons/di";
import { checkCurrenUserStatus } from "../../utils";
import { Badge, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.primary.main,
    },
    // [theme.breakpoints.up('lg')]: {
    //   backgroundColor: green[500],
    // },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "lightcyan",
    // backgroundColor: "#108",
  },

  toolbar: {
    flexWrap: "wrap",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    // color: "darkblue",
    fontWeight: "bold",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },

  link: {
    textDecoration: "none",
    // fontWeight: "bold",
    margin: theme.spacing(1, 1.5),
  },
  buttonLink: {
    margin: theme.spacing(0.5),
  },

  icon: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Header = (props) => {
  const theme = useTheme();
  const is_md_screen = useMediaQuery(theme.breakpoints.down("sm")); // up('sm')
  const classes = useStyles();
  const router = useRouter();

  const { sections, title } = props;
  const [value, setValue] = React.useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  // console.log("USER COOKIE FROM HEADER : ", cookies.user_name);
  //
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const isMenuOpen = Boolean(anchorEl);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  //
  const [currentUser, setCurrentUser] = React.useState(null);

  // console.log("User Authentication Status : ", props.auth);
  // if(!props.auth) {
  //   // first menu for un-authenticated users
  // }
  // else {
  //   // second menu for authenticated or logged in user
  // }

  // CHECK CURRENT USER STATE VALUES NOT OPTIMIZED - NEED CORRECT WORKING WITH NEXT.js SESSION STORAGE
  React.useEffect(() => {
    if (checkCurrenUserStatus() !== null) {
      setCurrentUser(checkCurrenUserStatus());
    }
  }, []);

  //

  const handleMenuClose = (link) => {
    setAnchorEl(null);

    // Testing Router Page Link
    // console.log("Link : ", link);

    if (link.length > 0) {
      if (link === "/signOut") {
        // logout api call
        // already implemented inside Logout icon button onClick handler function
      } else {
        router.push(link);
        // window.location.href = link;
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    var confirm_box = window.confirm("Are you sure you want to log out !");

    if (confirm_box === true) {
      // logout user api call
      // CSRF TOKEN
      const csrftoken = Cookies.get("csrftoken");

      const response = await fetch(`http://localhost:8000/api/logout`, {
        method: "POST",
        credentials: "include", // necessary if cookie - token is sent from backend
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
          // Authorization: "Bearer " + data.jwt, // no need here since it will be handled in the backend
        },
      });

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
      return;
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      // anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      id={menuId}
      keepMounted
      // transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        // onClick={handleProfileMenuOpen}
        style={{ justifyContent: "center" }}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        >
          <AccountCircle />
          <p>Messages</p>
        </IconButton>
      </MenuItem>
      <MenuItem>Name : {cookies && cookies.user_name}</MenuItem>
      <MenuItem>Email : {cookies && cookies.user_email}</MenuItem>
      <MenuItem onClick={() => handleMenuClose("/")}>Profile</MenuItem>
      <MenuItem onClick={() => handleMenuClose("/#about")}>My account</MenuItem>
      <MenuItem onClick={() => handleMenuClose("/signOut")}>
        <IconButton
          aria-label="logout current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
          onClick={handleLogout}
        >
          <PowerSettingsNewIcon />
        </IconButton>
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </MenuItem>
    </Menu>
  );

  //
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.grow}>
      {is_md_screen ? (
        <DrawerLeft />
      ) : (
        <AppBar
          position="relative" // "fixed"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <DiCssdeck className={classes.icon} />
            <Link
              style={{ flex: 1, textDecoration: "none" }}
              href=""
              className={classes.link}
            >
              <Typography
                color="primary"
                variant="h6"
                noWrap
                className={classes.toolbarTitle}
              >
                Etao Software Solutions
              </Typography>
            </Link>

            <nav>
              <Link
                variant="button"
                color="primary"
                href="/"
                className={classes.link}
              >
                Home
              </Link>
              <Link
                variant="button"
                color="primary"
                href="/#projects"
                className={classes.link}
              >
                Projects
              </Link>
              <Link
                variant="button"
                color="primary"
                href="/#technologies"
                className={classes.link}
              >
                Technologies
              </Link>
              <Link
                variant="button"
                color="primary"
                href="/#about"
                className={classes.link}
              >
                About
              </Link>
              <Link
                variant="button"
                color="primary"
                href="/#testimonials"
                className={classes.link}
              >
                Testimonials
              </Link>
              <Link
                variant="button"
                color="primary"
                href="/contact_us"
                className={classes.link}
              >
                Contact Us
              </Link>

              {cookies && cookies.user_name ? (
                <Link
                  variant="button"
                  color="primary"
                  href="/articles"
                  className={classes.link}
                >
                  Articles
                </Link>
              ) : null}
            </nav>

            {cookies.user_name ? (
              <>
                {renderMenu}

                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="primary"
                  onClick={handleClick}
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  href="/signup"
                  color="primary"
                  variant="outlined"
                  className={classes.buttonLink}
                >
                  Register
                </Button>
                <Button
                  href="/signin"
                  color="primary"
                  variant="outlined"
                  className={classes.buttonLink}
                >
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Header;
