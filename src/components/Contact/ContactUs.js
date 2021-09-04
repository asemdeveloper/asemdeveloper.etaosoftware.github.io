// import Head from "next/head";
// import styles from "../../styles/Contact.module.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  // FormControlLabel,
  // Grid,
  // Link,
  // IconButton,
  // InputAdornment,
  TextField,
  Typography,
  // Divider,
  // Collapse,
} from "@material-ui/core";
// import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
// import { useRouter } from "next/router";
import { Layout } from "../../layout/Layout";
import { EmailOutlined } from "@material-ui/icons";
import ReCAPTCHA from "react-google-recaptcha";

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
    marginTop: theme.spacing(6),
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
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  form2: {
    width: "auto",
    display: "inline-flex",
    marginLeft: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputError: {
    color: "red",
    fontWeight: "400",
  },
}));

export default function ContactUs() {
  const classes = useStyles();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const initialValues = {
    name: "",
    email: "",
    message: "",
    verified: false,
  };
  const [values, setValues] = useState(initialValues);
  const {
    register: register,
    handleSubmit: handleSubmit,
    reset: reset,
    // watch,
    formState: { errors },
  } = useForm();

  // CSRF TOKEN
  const csrftoken = Cookies.get("csrftoken");

  // Recaptcha
  const recaptchaRef = React.createRef();

  //
  const formSubmit = (e) => {
    // const recaptchaValue = recaptchaRef.current.getValue();
    // console.log("RECAPTCHA : ", recaptchaValue);

    if (!values.verified) {
      alert("Please verify the Recaptcha !");
      return;
    }

    if (values.name === "" || values.email === "" || values.message === "") {
      alert("Form fields cannot be empty !");
      return;
    }
    // e.preventDefault();
    // console.log("Sending : ", values.name);

    // let cancelToken = axios.CancelToken.source();

    // if (typeof cancelToken != typeof undefined) {
    //   cancelToken.cancel("Cancelling the previous API request !");
    // }

    // let data = {
    //   values.name,
    //   values.email,
    //   values.message,
    // };

    fetch("/api/contact", {
      // cancelToken: cancelToken.token,
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(values),
    }).then((res) => {
      // console.log("Response received");
      if (res.status === 200) {
        alert("Message sent !");
        // console.log("Response succeeded!");
        setSubmitted(true);
        // setName("");
        // setEmail("");
        // setMessage("");
        setValues(initialValues);
        // reset();
        window.location.href = "/contact_us";
      }
    });
  };

  function onRecaptchaChange(value) {
    // console.log("Captcha value:", value);
    setValues({
      ...values,
      ["verified"]: true,
    });
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    // console.log(
    //   "" + name,
    //   event.target.options[event.target.selectedIndex].text
    // );
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Layout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper2}>
            <Avatar className={classes.avatar}>
              <EmailOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Contact Form
            </Typography>
            <form
              key="1"
              onSubmit={handleSubmit(formSubmit)}
              id="form"
              className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                type="text"
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                autoFocus
                {...register("name", {
                  required: true,
                  minLength: 1,
                })} // You just have to move the onChange props after {...register(...)}
                // This overrides the libraries onChange function and will alter the behavior of the library
                value={values.name}
                onChange={handleInputChange}
              />
              {errors.name && errors.name.type === "required" && (
                <span className={classes.inputError}>* Name is required</span>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                {...register("email", {
                  required: "* Email is required",
                  minLength: {
                    value: 5,
                    message: "* Email must have at least 5 characters",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    // value:
                    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

                    message: "* Invalid email address",
                  },
                  //  pattern: /^[A-Za-z]+$/i
                })} // You just have to move the onChange props after {...register(...)}
                // This overrides the libraries onChange function and will alter the behavior of the library
                value={values.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className={classes.inputError}>
                  {errors.email.message}
                </span>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="message"
                label="Message"
                name="message"
                type="text"
                multiline
                rows={4}
                // onChange={(e) => {
                //   setMessage(e.target.value);
                // }}
                {...register("message", {
                  required: true,
                  minLength: 4,
                })} // You just have to move the onChange props after {...register(...)}
                // This overrides the libraries onChange function and will alter the behavior of the library
                value={values.message}
                onChange={handleInputChange}
              />
              {errors.message && errors.message.type === "required" && (
                <span className={classes.inputError}>
                  * Message is required
                </span>
              )}

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                onChange={onRecaptchaChange}
              />

              {/* <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.RECAPTCHA_KEY}
                onChange={useCallback(() => setDisableSubmit(false))}
              /> */}

              <Button
                // disabled={disableSubmit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                // onClick={(e) => {
                //   formSubmit(e);
                // }}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </Layout>
    </React.Fragment>
  );
}
