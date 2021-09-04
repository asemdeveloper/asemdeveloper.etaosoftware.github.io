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
import CloseIcon from "@material-ui/icons/Close";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { AddBox, Print } from "@material-ui/icons";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
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
  Divider,
  Collapse,
  ButtonGroup,
  Slide,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import { Edit, DeleteForever, RemoveIcon, Refresh } from "@material-ui/icons";
// import RefreshIcon from "@material-ui/icons/Refresh";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import TablePagination from "@material-ui/core/TablePagination";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Layout } from "../layout/Layout";
import apiService from "../apiservice/apiService";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    marginTop: theme.spacing(1),
    // paddingTop: theme.spacing(1),
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

  // articles container
  paper_article: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    // padding: theme.spacing(0),
  },
  card: {
    // maxWidth: 345,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    padding: "10px 1px 1px 8px",
  },
  cartButtonGroup: {
    backgroundColor: "inherit",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  appBarFormInput: {
    backgroundColor: "#eee",
    borderBottom: "0px solid #fafafa",
    borderRadius: "2px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Articles(props) {
  const classes = useStyles();
  const router = useRouter();

  const {
    register: register,
    handleSubmit: handleSubmit,
    reset: reset,
    // watch,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors2 },
    reset: reset2,
  } = useForm();

  const initialFormValues = {
    title: "",
    description: "",
    author: Cookies.get("user_name")
      ? JSON.parse(Cookies.get("user_name"))
      : "",
    // email: "",
  };
  const [values, setValues] = React.useState(initialFormValues);
  const [editArticle, setEditArticle] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [currentMenuClicked, setCurrentMenuClicked] = React.useState("");

  const [apiData, setApiData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // rows per page must match with backend page_size
  const [countAllExistingRecords, setCountAllExistingRecords] =
    React.useState(0);
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const [querySearchBy, setQuerySearchBy] = React.useState("");
  const [searchByOpen, setSearchByOpen] = React.useState(false);
  const [groupByValue, setGroupByValue] = React.useState("");
  const [groupByOpen, setGroupByOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState("success");
  const [isLoaded, setIsLoaded] = React.useState(false);
  // const [progress, setProgress] = useState(0); // progess bar
  //
  const [isLogin, setIsLogin] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // Add New Category Form functions
  const [openAddNewForm, setOpenAddNewForm] = React.useState(false);
  const [formType, setFormType] = React.useState("add");
  const [updateFormValues, setUpdateFormValues] = React.useState({});
  //
  const [search_term, setSearchTerm] = React.useState("");

  //
  let cancelToken; // Imp - Axios API Optimization - used to prevent previous API call to same Route if there is a new API call to same Route

  // CSRF TOKEN
  const csrftoken = Cookies.get("csrftoken");

  // React.useEffect(() => {
  //   if (cookies["user_name"]) {
  //     // router.push("/");
  //     window.location.href = "/";
  //   }

  //   return () => {
  //     // cleanup
  //   };
  // }, [isLogin, cookies]);

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(pageNumber = 1) {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Cancelling the previous API request !");
    }

    cancelToken = axios.CancelToken.source();
    await axios
      .get(
        `http://localhost:8000/api/articles?page=${pageNumber}`, // rows per page is controlled in the backend
        // `http://localhost:8000/api/articles/?limit=${rowsPerPage}&offset=${page}`, // if backend uses LimitOffsetPagination
        {
          cancelToken: cancelToken.token,
          credentials: "include", // necessary if cookie - token is sent from backend
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
            // Authorization: "Token " + token["mytoken"],
          },
        }
      )
      .then(function (response) {
        // console.log("Response Data Count : ", response.data.count);
        setApiData(response.data.results);
        // let number_pages = response.data.count; // customer user page limit and rows per page disabled
        let number_pages = Math.ceil(response.data.count / rowsPerPage);

        setNumberOfPages(number_pages);
        setCountAllExistingRecords(response.data.count);
        setIsLoaded(true);
      })
      .catch(function (error) {
        // handle error
        console.log(error);

        setOpenAlert(true);
        setAlertMessage(JSON.stringify(error.message));
        setAlertType("error");
        setIsLoaded(true);
      });
  }

  //
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

  const handleSearchInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSearchTerm(value);
  };

  //
  const formSubmit = async (data) => {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Cancelling the previous API request !");
    }

    cancelToken = axios.CancelToken.source();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author", cookies.user_name);
    formData.append("email", cookies.user_email);
    formData.append("user", cookies.user_id);

    // console.log("Form Data : ", data);
    if (formType !== "update") {
      await axios
        .post(
          `http://localhost:8000/api/articles/?page=${page}`, // rows per page is controlled in the backend
          formData,
          {
            // cancelToken: cancelToken.token,
            credentials: "include", // necessary if cookie - token is sent from backend
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
              // Authorization: "Bearer " + cookies.jwt,
            },
            // body: JSON.stringify(data),
          }
        )
        .then(function (response) {
          // console.log("Response Data : ", response);

          if (response) {
            if (response.status && response.status === "error") {
              let counter = 1;
              var error_messages = "";
              error_messages =
                error_messages + " " + counter + ") " + " " + response.errors;

              // setMessage(JSON.stringify(error_messages));
              // console.log("Register Response : ", error_messages);
              // alert("Response Error : " + error_messages);

              setOpenAlert(true);
              setAlertMessage(error_messages);
              setAlertType("error");
              setOpenAddNewForm(false);
            } else {
              window.location.href = "/articles";
            }
          }
        })
        .catch(function (error) {
          // handle error
          // console.log(error);

          setOpenAlert(true);
          setAlertMessage(JSON.stringify(error.message));
          setAlertType("error");
          setIsLoaded(true);
        });
    } else {
      await axios
        .put(
          `http://localhost:8000/api/articles/${updateFormValues.id}/`, // rows per page is controlled in the backend
          formData,
          {
            // cancelToken: cancelToken.token,
            credentials: "include", // necessary if cookie - token is sent from backend
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
              // Authorization: "Bearer " + cookies.jwt,
            },
            // body: JSON.stringify(data),
          }
        )
        .then(function (response) {
          // console.log("Response Data : ", response);

          if (response) {
            if (response.status && response.status === "error") {
              let counter = 1;
              var error_messages = "";
              error_messages =
                error_messages + " " + counter + ") " + " " + response.errors;

              // setMessage(JSON.stringify(error_messages));
              // console.log("Register Response : ", error_messages);
              // alert("Response Error : " + error_messages);

              setOpenAlert(true);
              setAlertMessage(error_messages);
              setAlertType("error");
              setOpenAddNewForm(false);
            } else {
              window.location.href = "/articles";
            }
          }
        })
        .catch(function (error) {
          // handle error
          // console.log(error);

          setOpenAlert(true);
          setAlertMessage(JSON.stringify(error.message));
          setAlertType("error");
          setIsLoaded(true);
        });
    }
  };

  const searchFormSubmit = async (data) => {
    // console.log("Search Form : ", data);
    // const formData = new FormData();
    // formData.append("search_value", data.search_value);

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Cancelling the previous API request !");
    }

    cancelToken = axios.CancelToken.source();

    await axios
      .get(
        `http://localhost:8000/api/articles/?page=${page}&search=${search_term}`, // rows per page is controlled in the backend
        {
          cancelToken: cancelToken.token,
          credentials: "include", // necessary if cookie - token is sent from backend
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
            // Authorization: "Bearer " + cookies.jwt,
          },
          // body: JSON.stringify(data),
        }
      )
      .then(function (response) {
        // console.log("Response Data Count : ", response.data.count);
        setApiData(response.data.results);
        // let number_pages = response.data.count; // customer user page limit and rows per page disabled
        let number_pages = Math.ceil(response.data.count / rowsPerPage);

        setNumberOfPages(number_pages);
        setCountAllExistingRecords(response.data.count);
        setIsLoaded(true);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);

        setOpenAlert(true);
        setAlertMessage(JSON.stringify(error.message));
        setAlertType("error");
        setIsLoaded(true);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    // fetchData();
  };

  // articles functions

  const handleClickOpenForm = () => {
    setOpenAddNewForm(true);
  };

  const handleFormClose = () => {
    setOpenAddNewForm(false);
    setFormType("add");

    // fetchData();

    // }
    // remote.getCurrentWindow().reload();
  };

  const addOrUpdateArticleForm = () => {
    // open add new or update article modal form
    // setEditArticle({ title: "", description: "" });
  };

  const editBtn = (article) => {
    try {
      if (cookies.user_email !== article.email) {
        alert("Not Allowed ! You can edit only your articles.");
      } else {
        setFormType("update");
        setUpdateFormValues(article);
        setValues(article);
        handleClickOpenForm();
      }
    } catch (e) {
      alert(e);
    }
  };

  const deleteBtn = async (article) => {
    try {
      if (cookies.user_email !== article.email) {
        alert("Not Allowed ! You can edit only your articles.");
      } else {
        var confirm_box = window.confirm(
          "Are you sure you want to delete selected article !"
        );

        if (confirm_box === true) {
          await axios
            .delete(`http://localhost:8000/api/articles/${article.id}/`, {
              // cancelToken: cancelToken.token,
              credentials: "include", // necessary if cookie - token is sent from backend
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
                // Authorization: "Bearer " + cookies.jwt,
              },
              // body: JSON.stringify(data),
            })
            .then(function (response) {
              // console.log("Response Data : ", response);

              if (response) {
                if (response.status && response.status === "error") {
                  let counter = 1;
                  var error_messages = "";
                  error_messages =
                    error_messages +
                    " " +
                    counter +
                    ") " +
                    " " +
                    response.errors;

                  // setMessage(JSON.stringify(error_messages));
                  // console.log("Register Response : ", error_messages);
                  // alert("Response Error : " + error_messages);

                  setOpenAlert(true);
                  setAlertMessage(error_messages);
                  setAlertType("error");
                  setOpenAddNewForm(false);
                } else {
                  window.location.href = "/articles";
                }
              }
            })
            .catch(function (error) {
              // handle error
              // console.log(error);

              setOpenAlert(true);
              setAlertMessage(JSON.stringify(error.message));
              setAlertType("error");
              setIsLoaded(true);
            });
        } else {
          return;
        }
      }
    } catch (e) {
      alert(e);
    }

    return;
    // apiService
    //   .deleteArticle(article.id, token["mytoken"])
    //   .then((resp) => props.deleteBtn(article))
    //   .catch((error) => console.log(error));
  };

  const handleExpandClick = (id) => {
    setExpanded(!expanded);

    setCurrentMenuClicked(id); // here id or p_code or any send value should be converted to string value - Is important
    // console.log("Clicked Product ID", id);
  };

  //
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout>
        <div className={classes.paper}>
          {openAddNewForm ? (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              {/* <div className={classes.paper}> */}
              <Dialog
                TransitionComponent={Transition}
                maxWidth="md"
                // disableBackdropClick
                open={openAddNewForm}
                onClose={handleFormClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title" style={{ padding: "0px" }}>
                  <IconButton
                    className={classes.avatar}
                    style={{ float: "right" }}
                    onClick={handleFormClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>
                    <Typography component="h1" variant="h5" color="primary">
                      Add New Article
                    </Typography>
                  </DialogContentText> */}

                  <CssBaseline />
                  <div className={classes.paper2}>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      {formType === "update"
                        ? "Update Article #" +
                          updateFormValues.id +
                          " - " +
                          updateFormValues.title
                        : "Add Article"}
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
                        id="title"
                        label="Title"
                        name="title"
                        type="text"
                        autoFocus
                        {...register("title", {
                          required: true,
                          minLength: 4,
                        })} // You just have to move the onChange props after {...register(...)}
                        // This overrides the libraries onChange function and will alter the behavior of the library
                        value={values.title}
                        onChange={handleInputChange}
                      />
                      {errors.title && errors.title.type === "required" && (
                        <span className={classes.inputError}>
                          * Article Title is required
                        </span>
                      )}

                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="description"
                        label="Description"
                        id="description"
                        {...register("description", {
                          required: true,
                          minLength: 4,
                        })} // You just have to move the onChange props after {...register(...)}
                        // This overrides the libraries onChange function and will alter the behavior of the library
                        value={values.description}
                        onChange={handleInputChange}
                      />
                      {errors.description &&
                        errors.description.type === "required" && (
                          <span className={classes.inputError}>
                            * Description is required
                          </span>
                        )}

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Submit
                      </Button>
                    </form>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleFormClose} color="primary">
                    CLOSE
                  </Button>
                </DialogActions>
              </Dialog>
              {/* </div> */}
            </Container>
          ) : null}
          {/*  */}
        </div>
        {/* Articles */}

        <Container component="main" maxWidth="md">
          {!isLoaded ? (
            <Typography
              component="h1"
              variant="h5"
              style={{
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
                paddingTop: "30px",
              }}
            >
              Loading results...
            </Typography>
          ) : (
            <>
              <Collapse in={openAlert} style={{ marginBottom: "5px" }}>
                <Alert
                  // variant="filled"
                  severity={alertType}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {alertMessage}
                </Alert>
              </Collapse>

              <CssBaseline />
              <div className={classes.paper_article}>
                <div>
                  <Typography
                    component="h1"
                    variant="h4"
                    style={{
                      float: "left",
                      color: "darkblue",
                      fontWeight: "bold",
                    }}
                  >
                    Articles
                  </Typography>
                  <form
                    key="2"
                    onSubmit={handleSubmit2(searchFormSubmit)}
                    id="form2"
                    className={classes.form2}
                    noValidate
                  >
                    <TextField
                      variant="standard"
                      id="search_value"
                      // label="Search"
                      name="search_value"
                      type="text"
                      {...register2("search_value", {
                        required: true,
                        minLength: 1,
                      })} // You just have to move the onChange props after {...register(...)}
                      // This overrides the libraries onChange function and will alter the behavior of the library
                      value={search_term}
                      onChange={handleSearchInputChange}
                      placeholder={"Enter search term"}
                      // style={{
                      //   marginLeft: "20px",
                      //   // flexDirection: "row",
                      // }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              type="submit"
                              // onClick={(event) => {
                              //   handleSearchSubmit(event);
                              // }}
                            >
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <IconButton
                      style={{ color: "red", padding: "5px" }}
                      onClick={(event) => {
                        window.location.href = "/articles";
                      }}
                    >
                      <Refresh />
                    </IconButton>
                  </form>

                  <IconButton
                    style={{ float: "right" }}
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                      setValues(initialFormValues);
                      handleClickOpenForm();
                    }}
                    title="add new article"
                  >
                    <PostAddIcon />
                  </IconButton>
                  {/* <IconButton
                    style={{ float: "right" }}
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                      handleClickOpenForm();
                    }}
                    title="add new article"
                  >
                    <AddBox />
                  </IconButton> */}
                </div>
                <Grid
                // container
                // style={{
                //   display: "block",
                // }}
                >
                  {apiData &&
                    apiData.map((row) => (
                      <Grid item key={row.id} xs={12} sm={12} md={12}>
                        <Card className={classes.card}>
                          {/* <CardHeader
                          // avatar={
                          //   <Avatar
                          //     aria-label="recipe"
                          //     className={classes.avatar}
                          //   >
                          //     R
                          //   </Avatar>
                          // }
                          // action={
                          //   <IconButton aria-label="settings">
                          //     <MoreVertIcon />
                          //   </IconButton>
                          // }
                          title={row.p_name}
                          subheader={row.brand}
                        /> */}

                          <CardContent className={classes.cardContent}>
                            <Typography
                              variant="body2"
                              // color="primary"
                              component="p"
                              style={{
                                color: "darkblue",
                                fontWeight: "bolder",
                                float: "left",
                              }}
                              // gutterBottom variant="h5" component="h2"
                            >
                              {row.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="p"
                              style={{
                                color: "darkblue",
                                fontWeight: "bold",
                                float: "right",
                              }}
                            >
                              Author : {row.author}
                            </Typography>

                            <Divider />
                          </CardContent>

                          <CardActions
                            color="primary"
                            disableSpacing
                            style={{ padding: "1px 1px 1px 8px" }}
                          >
                            {/* <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="share">
                            <ShareIcon />
                          </IconButton> */}
                            {/* <Typography
                        paragraph
                        variant="body2"
                        color="secondary" //"textSecondary"
                        fontSize="small"
                      >
                        <span>{row.description}</span>
                      </Typography> */}
                            <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                              })}
                              onClick={() =>
                                handleExpandClick(row.id.toString())
                              }
                              aria-expanded={
                                expanded &&
                                currentMenuClicked === row.id.toString()
                              }
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </CardActions>
                          <Collapse
                            key={row.id}
                            // in={expanded}
                            in={
                              expanded &&
                              currentMenuClicked === row.id.toString()
                            }
                            timeout="auto"
                            unmountOnExit
                          >
                            <CardContent>
                              <Typography
                                paragraph
                                variant="body2"
                                // color="primary"
                                // fontSize="small"
                                style={{
                                  color: "darkblue",
                                  fontWeight: "bold",
                                }}
                              >
                                Description:
                              </Typography>
                              <Typography
                                paragraph
                                variant="body2"
                                // color="primary" //"textSecondary"
                                // fontSize="small"
                                style={{
                                  color: "darkblue",
                                  fontWeight: "bold",
                                }}
                              >
                                {row.description}
                              </Typography>
                            </CardContent>
                          </Collapse>

                          {cookies.user_email &&
                          cookies.user_email === row.email ? (
                            <CardActions
                              style={{
                                padding: "0px",
                                display: "block",
                                alignSelf: "center",
                              }}
                            >
                              <ButtonGroup variant="contained">
                                <Button
                                  style={{ color: "blue" }}
                                  className={classes.cartButtonGroup}
                                  aria-label="update-article"
                                  onClick={() => {
                                    editBtn(row);
                                  }}
                                  title="Update Article"
                                >
                                  <Edit fontSize="small" />
                                </Button>

                                <Button
                                  style={{ color: "red" }}
                                  className={classes.cartButtonGroup}
                                  aria-label="delete-article"
                                  onClick={() => {
                                    deleteBtn(row);
                                  }}
                                  title="Delete Article"
                                >
                                  <DeleteForever fontSize="small" />
                                </Button>
                              </ButtonGroup>
                            </CardActions>
                          ) : null}
                        </Card>
                      </Grid>
                    ))}
                </Grid>

                {/* PAGINATION */}
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Pagination
                      count={numberOfPages}
                      variant="outlined"
                      shape="rounded"
                      showFirstButton
                      showLastButton
                      // boundaryCount={2}
                      onChange={(event, current) => {
                        setPage(current);
                        search_term === ""
                          ? fetchData(current)
                          : searchFormSubmit(current);
                      }}
                      style={{ marginTop: "10px", float: "right" }}
                    />
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </Container>
      </Layout>
    </React.Fragment>
  );
}

// Articles.getInitialProps = async ({ req, res }) => {
//   const articles = await axios
//     .get("http://localhost:8000/api/articles", {
//       // cancelToken: cancelToken.token,
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: "Token " + token["mytoken"],
//       },
//     })
//     .then(function (response) {
//       // console.log(response.data);
//       // setApiData(response.data);

//       return response.json();
//     })
//     .catch(function (error) {
//       // handle error
//       // console.log(error);
//       return [];
//     });

//   return {
//     props: {
//       articles: articles,
//     },
//   };

//   // return {
//   //   articles: articles && articles,
//   // };
// };
