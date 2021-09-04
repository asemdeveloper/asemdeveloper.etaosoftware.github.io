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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import { motion } from "framer-motion";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import "./custom_testimonials.css"; // wrong - so global import in _app.js

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  root: {
    // backgroundColor: "#0F1624",
    // accent1: "hsl(34.9,98.6%,72.9%)",
    // button: "hsl(205.1,100%,36.1%)",
    // backgroundColor: "hsl(232.7,27.3%,23.7%)",
    // backgroundColor: "linear-gradient(121.57deg, #FFFFFF 18.77%, rgba(255, 255, 255, 0.66) 60.15%)",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: "#0F1624",
    backgroundColor: "lightblue",
    // background: "linear-gradient(250deg, #7b2ff7, #f107a3)",
    padding: theme.spacing(8, 0, 6),
    // backgroundImage: 'radial-gradient(circle at 50% 14em, #ff0000 0%, #ff0000 60%, #ff0000 100%)',
    backgroundImage: `url("my_animation.svg")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "auto", // 'cover',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4), // theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "lightcyan",
    // background: "linear-gradient(250deg, #7b2ff7, #f107a3)",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardText: {
    fontWeight: 300,
    // color: "rgba(255, 255, 255, 0.5)",
  },
  gridContainer: {
    paddingTop: theme.spacing(2),
    // marginBottom: "20px",
    paddingBottom: theme.spacing(2),
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
    background:
      "linear-gradient(270deg, #00FAFA 0%, #DEDEDE 100%, rgba(200, 100, 10, 0.66) 60.15%)",
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
    marginTop: theme.spacing(4),
    color: "lightblue",
    fontWeight: "bold",
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

const cards = [
  {
    id: 1,
    icon: <DiReact size="3rem" />,
    title: "Front-End",
    description: "Experience with : React.js, Next.js, Material-ui, Bootstrap",
  },
  {
    id: 2,
    icon: <DiFirebase size="3rem" />,
    title: "Back-End",
    description: "Experience with : Python Django, Node Express.js, PHP",
  },
  {
    id: 3,
    icon: <PhoneAndroidIcon size="3rem" />,
    title: "Mobile App",
    description: "Experience with : Native Android Java, React Native",
  },
];

const Testimonials = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const is_md_screen = useMediaQuery(theme.breakpoints.down("sm")); // up('sm')

  return (
    <>
      <Typography
        id="contact"
        className={classes.titleWithDivider}
        variant="h4"
        align="left"
        color="primary"
        paragraph
      >
        Testimonials
      </Typography>
      <Typography
        variant="h6"
        align="center"
        paragraph
        style={{ color: "darkcyan", fontStyle: "oblique" }}
      >
        What our clients say
      </Typography>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div>
          <img src="/images/1.png" />
          <div className="myCarousel">
            <h3>Shirley Fultz</h3>
            <h4>Designer</h4>
            <p>
              It's freeing to be able to catch up on customized news and not be
              distracted by a social media element on the same site
            </p>
          </div>
        </div>

        <div>
          <img src="/images/2.png" />
          <div className="myCarousel">
            <h3>Daniel Keystone</h3>
            <h4>Designer</h4>
            <p>
              The simple and intuitive design makes it easy for me use. I highly
              recommend Fetch to my peers.
            </p>
          </div>
        </div>

        <div>
          <img src="/images/3.jpg" />
          <div className="myCarousel">
            <h3>Theo Sorel</h3>
            <h4>Designer</h4>
            <p>
              I enjoy catching up with Fetch on my laptop, or on my phone when
              I'm on the go!
            </p>
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Testimonials;
