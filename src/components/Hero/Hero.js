import React from "react";
import { DiFirebase, DiReact, DiZend } from "react-icons/di";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { motion } from "framer-motion";
import Typed from "react-typed";
import Typist from "react-typist";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: "#0F1624",
    // backgroundColor: "lightblue",
    background: "linear-gradient(250deg, #7b2ff7, #f107a3)",
    padding: theme.spacing(10, 0, 4), // (8, 0, 6)
    // paddingTop: theme.spacing(10),
    // backgroundImage: 'radial-gradient(circle at 50% 14em, #ff0000 0%, #ff0000 60%, #ff0000 100%)',

    // background: "linear-gradient(250deg, #7b2ff7, #f107a3)",
    // backgroundImage: `url("my_animation.svg")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "auto", // 'cover',
  },
  gridContainer: {
    // marginBottom: "20px",
    paddingBottom: theme.spacing(6),
  },
  sectionTitle: {
    fontWeight: 800,
    fontSize: "65px", // 56px
    lineHeight: "56px", // 56px
    padding: "5px 0 2px",
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: "16px",
    width: "max-content",
    // maxWidth: "100%",
    // background: "linear-gradient(121.57deg, #FFFFFF 18.77%, rgba(255, 255, 255, 0.66) 60.15%)"
    // background: "linear-gradient(121.57deg, #DEDEDE 18.77%, rgba(200, 100, 10, 0.66) 60.15%)"
    // background:
    //   "linear-gradient(270deg, #00FAFA 0%, #DEDEDE 100%, rgba(200, 100, 10, 0.66) 60.15%)",
    background: "linear-gradient(250deg, #7b2ff7, #f107a3)",
  },
  sectionText: {
    maxWidth: "800px",
    fontSize: "24px",
    lineHeight: "40px",
    fontWeight: 300,
    paddingBottom: "3.6rem",
    color: "rgba(255, 255, 255, 0.5)",
  },
  buttonSection: {
    borderRadius: "50px",
    // background: "linear-gradient(270deg, #ff622e 0%, #B133FF 100%)", // "linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)"
    // "linear-gradient(270deg, #F46737 0%, #945DD6 100%)", "linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)"
    // opacity: {props.disabled ? '.5' : '1',
    transition: ".4s ease",
    cursor: "pointer",
    // boxShadow: {props.disabled ? 'inset 0px 2px 1px rgba(46, 49, 55, 0.15), inset 0px 0px 4px rgba(20, 20, 55, 0.3)' : 'none',
    boxShadow:
      "inset 0px 2px 1px rgba(46, 49, 55, 0.15), inset 0px 0px 4px rgba(20, 20, 55, 0.3)",
  },
  titleWithDivider: {
    width: "max-content",
    // marginTop: "20px",
    // maxWidth: "100%",
    // borderTop: `1px solid ${theme.palette.divider}`,
    // borderBottom: `1px solid ${theme.palette.divider}`,
    // background: "linear-gradient(270deg, #00FAFA 0%, #DEDEDE 100%)", // "linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)"
    background: "linear-gradient(270deg, #FAFAFA 0%, #DEDEDE 100%)", // "linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)"
    // "linear-gradient(270deg, #F46737 0%, #945DD6 100%)", "linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)"
    // opacity: {props.disabled ? '.5' : '1',
    // transition: ".4s ease",
    // boxShadow: 'inset 0px 2px 1px rgba(46, 49, 55, 0.15), inset 0px 0px 4px rgba(20, 20, 55, 0.3)',
  },
}));

const Hero = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        {/* <Typed
          // className={classes.sectionTitle}
          strings={["Here you can find anything"]}
          typeSpeed={40}
          backSpeed={50}
          loop
        />
        <br /> */}

        {/* <Typed
          strings={[
            "Search for products",
            "Search for categories",
            "Search for brands",
          ]}
          typeSpeed={40}
          backSpeed={50}
          attr="placeholder"
          loop
        >
          <input type="text" />
        </Typed> */}

        {/*  */}
        {/* <Typist>Animate this text.</Typist>

        <Typist>
          <span className="my-custom-class"> First Sentence </span>
          <br />
          <div className="container">
            <p> This will be animated after first sentence is complete </p>
            <Typography
              className={classes.sectionTitle}
              component="h1"
              variant="h2"
              align="left"
              color="primary"
              gutterBottom
            >
              Welcome to
            </Typography>
          </div>
          Final sentence
        </Typist>

        <Typist>
          <p> First Sentence </p>
          <Typist.Delay ms={500} />
          <br />
          This won't be animated until 500ms after the first sentenced is
          rendered
        </Typist> */}

        {/*  */}

        <Typist
          cursor={{
            show: false,
            blink: true,
            element: "|",
            hideWhenDone: true,
            hideWhenDoneDelay: 1000,
          }}
        >
          <Typography
            className={classes.sectionTitle}
            component="h1"
            variant="h2"
            align="left"
            color="primary"
            gutterBottom
          >
            Welcome to
          </Typography>
          <Typist.Delay ms={500} />
          <Typography
            className={classes.sectionTitle}
            component="h1"
            variant="h2"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            My personal website
          </Typography>
        </Typist>
        {/* <Typist>
          <Typist.Delay ms={1500} /> */}
        {/* <Typography variant="h5" align="left" color="textSecondary" paragraph>
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
        </Typography> */}
        {/* </Typist> */}

        <Typed
          className={classes.sectionText}
          strings={[
            `The purpose of Etao Software Solutions is to help aspiring and
            established developers to take their development skills to the next
            level and help build awesome apps.`,
          ]}
          typeSpeed={50}
          // backSpeed={60}
          // loop
        />

        <div className={classes.heroButtons}>
          <Grid container spacing={2} justifyContent="flex-start">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonSection}
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Register
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonSection}
                onClick={() => {
                  window.location.href = "/contact_us";
                }}
              >
                Contact
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
