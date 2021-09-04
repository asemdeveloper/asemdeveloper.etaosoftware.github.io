import React from "react";
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DrawerLeft from "../Drawer/DrawerLeft";
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Link from '@material-ui/core/Link';
import { DiCssdeck } from "react-icons/di";

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    // [theme.breakpoints.up('lg')]: {
    //   backgroundColor: green[500],
    // },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  
  toolbar: {
    flexWrap: 'wrap',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    // color: "darkblue",
    fontWeight: "bold"
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },


  link: {
    margin: theme.spacing(1, 1.5),
  },
  buttonLink: {
    margin: theme.spacing(.5),
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
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
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
  const is_md_screen = useMediaQuery(theme.breakpoints.down('sm')); // up('sm')
  const classes = useStyles();
  const { sections, title } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.grow}>
    <ElevationScroll {...props}>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        <DiCssdeck className={classes.icon} />
          <Typography color="primary" variant="h6" noWrap className={classes.toolbarTitle}>
              Etao Software Solutions
          </Typography>
        {is_md_screen ? <DrawerLeft /> : <>
          <nav>
            <Link variant="button" color="primary" href="#" className={classes.link}>
              Home
            </Link>
            <Link variant="button" color="primary" href="#projects" className={classes.link}>
              Projects
            </Link>
            <Link variant="button" color="primary" href="#technologies" className={classes.link}>
              Technologies
            </Link>
            <Link variant="button" color="primary" href="#about" className={classes.link}>
              About
            </Link>
            <Link variant="button" color="primary" href="#features" className={classes.link}>
              Features
            </Link>
            <Link variant="button" color="primary" href="#support" className={classes.link}>
              Support
            </Link>
          </nav>

          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon color="primary"/>
            </Badge>
          </IconButton>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <AccountCircle />
          </IconButton>
        
            <Button href="#" color="primary" variant="outlined" className={classes.buttonLink}>
              Register
            </Button>
            <Button href="#" color="primary" variant="outlined" className={classes.buttonLink}>
              Login
            </Button>
          </>
        }
      </Toolbar>
      
      </AppBar>
      </ElevationScroll>
    </div>
  );
}

// const Header = () => (
//   <>
  
//       <Link href="/">
//         <a
//           style={{
//             display: "flex",
//             alignItems: "center",
//             color: "white",
//             marginBottom: "20px",
//           }}
//         >
//           <DiCssdeck size="3rem" /> Portfolio
//         </a>
//       </Link>
    
//       <li>
//         <Link href="#projects">
//           Projects
//         </Link>
//       </li>
//       <li>
//         <Link href="#tech">
//           Technologies
//         </Link>
//       </li>
//       <li>
//         <Link href="#about">
//           About
//         </Link>
//       </li>
//       <li>
//         <Link href="/signup">
//           Sign Up
//         </Link>
//       </li>
//       <li>
//         <Link href="/signin">
//           Sign In
//         </Link>
//       </li>
//       <li>
//         <Link href="/article">
//           Blog
//         </Link>
//       </li>
    
      
  
//   </>
// );

export default Header;
