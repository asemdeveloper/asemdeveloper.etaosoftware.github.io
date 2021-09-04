import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import {
  // Person,
  // VisibilitySharp,
  VisibilityOff,
  AlternateEmail,
} from "@material-ui/icons";
import VisibilityIcon from "@material-ui/icons/Visibility";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputError: {
    color: "red",
    fontWeight: "400",
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const initialValues = {
    // name: "",
    email: "",
    password: "",
  };
  const [values, setValues] = React.useState(initialValues);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  // const [cookies_name, setCookie_Name, removeCookie_Name] = useCookies([
  //   "user_name",
  // ]);
  // const [cookies_email, setCookie_Email, removeCookie_Email] = useCookies([
  //   "user_email",
  // ]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  React.useEffect(() => {
    if (cookies["user_name"]) {
      // router.push("/");
      window.location.href = "/";
    }

    return () => {
      // cleanup
    };
  }, [isLogin, cookies]);

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

  const formSubmit = (data) => {
    // e.preventDefault();
    // console.log("ITEM:", data);

    // if present before register and login
    // removeCookie("token");
    removeCookie("user_name");
    removeCookie("user_email");

    // crsf, jwt token and other cookie credentials implemented in apiService.js
    apiService
      .loginUser(data) // values
      // .then((resp) => setToken("mytoken", resp.token))
      .then((response) => {
        // alert("Sign in successfully");
        // console.log("Response data : ", response.jwt);

        if (response) {
          if (response.status && response.status === "error") {
            let counter = 1;
            var error_messages = "";
            error_messages =
              error_messages + " " + counter + ") " + " " + response.errors;

            // setMessage(JSON.stringify(error_messages));
            // console.log("Register Response : ", error_messages);
            alert("Response Error : " + error_messages);
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

            reset();
            router.push("/");
          }
        }
      })
      .catch((error) => {
        // console.log("ERROR 2 : ", error);
        alert("Error : " + error.toString());
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
              Sign in
            </Typography>
            <form
              onSubmit={handleSubmit(formSubmit)}
              id="form"
              className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    // value:
                    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

                    message: "Invalid email address",
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
              {errors.email && errors.email.type === "required" && (
                <span className={classes.inputError}> * Email is required</span>
              )}

              {errors.email && errors.email.type === "pattern" && (
                <span className={classes.inputError}>
                  * Invalid Email Address
                </span>
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                // type="password"
                type={showPassword ? "text" : "password"}
                // inputProps={{
                //   minLength: 4,
                // }}
                id="password"
                // autoComplete="current-password"
                {...register("password", { required: true, minLength: 4 })} // You just have to move the onChange props after {...register(...)}
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
                        {showPassword ? <VisibilityIcon /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && errors.password.type === "required" && (
                <span className={classes.inputError}>
                  * Password is required
                </span>
              )}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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
