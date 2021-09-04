import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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

  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0,
    },
  },
  step: {
    color: "lightblue", // override for all cases "rgba(0, 0, 0, 0.38)", // "pink"

    "& $completed": {
      color: "lightgreen",
    },
    "& $active": {
      color: "lightblue", // "pink", // in case you want to make it different from others
    },
    "& $disabled": {
      color: "red",
    },
  },
  alternativeLabel: {
    // color: "black", // override for all cases "rgba(0, 0, 0, 0.38)", // "pink"
    // fontWeight: "500",
    // "& $active": {
    //   // color: "black", // override for all cases "rgba(0, 0, 0, 0.38)", // "pink"
    //   // fontWeight: "400",
    // },
  },
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0,
    },
  },
}));

function getSteps() {
  return [
    "Started learning Web development - 2011",
    "Started learning Android development - 2015",
    "Worked as a freelance developer - 2015",
    "Founded Etao Sotware Solutions - 2018",
    "Founded EtaoTravels.com - 2021",
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    case 3:
      return "Select campaign settings...";
    case 4:
      return "What is an ad group anyways?";
    case 5:
      return "This is the bit I really care about!";
    default:
      return "Unknown stepIndex";
  }
}

const About = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(null); // 0
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Typography
        id="about"
        className={classes.titleWithDivider}
        variant="h4"
        align="left"
        color="primary"
        paragraph
      >
        About Us
      </Typography>
      <Typography variant="h6" align="left" color="textSecondary" paragraph>
        The purpose of Etao Software Solutions is to help aspiring and
        established developers to take their development skills to the next
        level and help build awesome apps.
      </Typography>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        classes={{
          root: classes.root,
        }}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            classes={{
              root: classes.step,
              completed: classes.completed,
              // active: classes.active,
            }}
          >
            <StepLabel
              classes={{
                alternativeLabel: classes.alternativeLabel,
                labelContainer: classes.labelContainer,
              }}
              StepIconProps={{
                classes: {
                  root: classes.step,
                  completed: classes.completed,
                  // active: classes.active,
                  // disabled: classes.disabled,
                },
              }}
            >
              {" "}
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default About;
