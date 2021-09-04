import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  // Person,
  // VisibilitySharp,
  VisibilityOff,
  AlternateEmail,
} from "@material-ui/icons";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Layout } from "../layout/Layout";
import apiService from "../apiservice/apiService";
import ReCAPTCHA from "react-google-recaptcha";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputError: {
    color: "red",
    fontWeight: "400",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  const password = React.useRef({});
  password.current = watch("password", "");

  //
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    verified: false,
  };

  const [values, setValues] = React.useState(initialValues);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  const [message, setMessage] = React.useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // const [token, setToken] = useCookies(["mytoken"]);

  //
  React.useEffect(() => {
    if (isRegister) {
      // console.log("Values ", values);
      // crsf, jwt token and other cookie credentials implemented in apiService.js
      apiService
        .loginUser(values)
        // .then((resp) => setToken("mytoken", resp.token))
        .then((response) => {
          // alert("Sign in successfully");
          // console.log("Response data : ", response);

          if (response) {
            if (response.status && response.status === "error") {
              let counter = 1;
              var error_messages = "";
              error_messages =
                error_messages + " " + counter + ") " + " " + response.errors;

              // setMessage(JSON.stringify(error_messages));
              // console.log("Register Response : ", error_messages);
              alert("Error : " + error_messages);
            } else {
              // if present before register and login
              removeCookie("user_id");
              removeCookie("user_name");
              removeCookie("user_email");

              //
              setIsLogin(true);
              // setCookie("token", JSON.stringify(response.jwt), {
              //   path: "/",
              //   maxAge: 3600, // or 60*60 Expires after 1hr
              //   sameSite: true, // "strict"
              //   httpOnly: true,
              //   secure: process.env.NODE_ENV !== "development",
              // });

              setCookie("user_id", JSON.stringify(response.user_id), {
                path: "/",
                maxAge: 3600, // or 60*60 Expires after 1hr
                sameSite: true, // "strict"
              });

              setCookie("user_name", JSON.stringify(response.name), {
                path: "/",
                maxAge: 3600, // or 60*60 Expires after 1hr
                sameSite: true,
              });

              setCookie("user_email", JSON.stringify(response.email), {
                path: "/",
                maxAge: 3600, // or 60*60 Expires after 1hr
                sameSite: true,
              });

              router.push("/");
            }
          }
        })
        .catch((error) => {
          // console.log("ERROR 2 : ", error);
          alert("Error : " + error.toString());
        });
    }

    if (cookies["user_name"]) {
      // router.push("/"); // "dashboard" if implemented
      window.location.href = "/";
    }

    return () => {
      // cleanup
    };
  }, [isRegister, cookies]);

  // Recaptcha
  const recaptchaRef = React.createRef();

  const formSubmit = (data) => {
    if (!values.verified) {
      alert("Please verify the Recaptcha !");
      return;
    }

    setValues(data);
    // reset();
    // console.log("Form : ", data);
    apiService
      .registerUser(data) // { data.username, data.password}
      .then((response) => {
        if (response) {
          if (response.status && response.status === "error") {
            let counter = 0;
            var error_messages = "";
            Object.values(response.errors).map((element) => {
              error_messages =
                error_messages + " " + (counter + 1) + ") " + " " + element;
              counter = counter + 1;
            });

            // setMessage(JSON.stringify(error_messages));
            // console.log("Register Response : ", error_messages);
            alert("Error : " + error_messages);
          } else {
            // if present before register and login
            removeCookie("user_id");
            removeCookie("user_name");
            removeCookie("user_email");
            //
            setIsRegister(true);
          }
        }
      })
      .catch((error) => {
        // console.log(error);
        alert("Error : " + error.toString());
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
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form
              onSubmit={handleSubmit(formSubmit)}
              className={classes.form}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    // type="text"
                    {...register("name", {
                      required: "* Name is required",
                    })} // You just have to move the onChange props after {...register(...)}
                    // This overrides the libraries onChange function and will alter the behavior of the library
                    value={values.name}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton color="primary">
                            <AlternateEmail />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.name && (
                    <span className={classes.inputError}>
                      {errors.name.message}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    // autoComplete="email"
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton color="primary">
                            <AlternateEmail />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.email && (
                    <span className={classes.inputError}>
                      {errors.email.message}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    // inputProps={{
                    //   minLength: 4,
                    // }}
                    id="password"
                    {...register("password", {
                      required: "* You must specify a password",
                      minLength: {
                        value: 8,
                        message: "* Password must have at least 8 characters",
                      },
                    })}
                    // This overrides the libraries onChange function and will alter the behavior of the library

                    value={values.password}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            color="primary"
                            title="Click to show/hide password"
                            onClick={(event) => {
                              // console.log("New password : ", !showPassword);
                              setShowPassword((oldValue) => !oldValue);
                              // setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && (
                    <span className={classes.inputError}>
                      {errors.password.message}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    inputProps={{
                      minLength: 4,
                    }}
                    id="confirm_password"
                    // {...register("confirm_password", {
                    //   required: true,
                    //   minLength: 8,
                    // })}
                    // {...register("confirm_password", {
                    //   validate: (value) =>
                    //     value === password.current ||
                    //     "* The passwords do not match",
                    // })}
                    {...register("confirm_password", {
                      required: "* Please confirm password!",
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return (
                            password === value || "* Passwords should match!"
                          );
                        },
                      },
                    })}
                    // You just have to move the onChange props after {...register(...)}
                    // This overrides the libraries onChange function and will alter the behavior of the library
                    value={values.confirm_password}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            color="primary"
                            title="Click to show/hide password"
                            onClick={(event) => {
                              // console.log("New password : ", !showPassword);
                              setShowPassword((oldValue) => !oldValue);
                              // setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.confirm_password && (
                    <span className={classes.inputError}>
                      {errors.confirm_password.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                    onChange={onRecaptchaChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Layout>
    </React.Fragment>
  );
}
