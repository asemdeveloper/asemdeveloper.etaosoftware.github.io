import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
import { Layout } from "../layout/Layout";
import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import Technologies from "../components/Technologies/Technologies";
import About from "../components/About/About";
import ContactUs from "../components/Contact/ContactUs";
import { parseCookies } from "../utils";
import Testimonials from "../components/Testimonials/Testimonials";
// import { motion } from "framer-motion";

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
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4), // theme.spacing(8),
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

function Home({ data }) {
  const classes = useStyles();

  const [message, setMessage] = React.useState("");
  const [auth, setAuth] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        if (data.user_name !== undefined) {
          const response = await fetch(`http://localhost:8000/api/user`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
              // Authorization: "Bearer " + data.jwt, // no need here since it will be handled in the backend
            },
          });

          const content = await response.json();
          // console.log("USER DATA FROM HOME : ", content);
          setMessage(`Hi ${content.name}`);
          setAuth(true);
        } else {
          setMessage("");
          // setMessage("You are not logged in !");
          setAuth(false);
        }
      } catch (e) {
        setMessage("");
        // setMessage("You are not logged in !");
        setAuth(false);
      }
    })();
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Layout auth={auth}>
        <main className={classes.root}>
          <Hero />
          <Container className={classes.cardGrid} maxWidth="md">
            {/* <p style={{ color: "red", fontWeight: "bolder" }}> */}
            {/* Data from cookie: {data.user_name} */}
            {/* {message && message} */}
            {/* </p> */}

            {/* <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  scale: 0.8,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.4,
                  },
                },
              }}
            >
              <h1 className="title">Wubba Lubba Dub Dub!</h1>
            </motion.div> */}

            <Projects />
            <Technologies />
            <About />
            <Testimonials />
            {/* <ContactUs /> */}
          </Container>
        </main>
      </Layout>
    </React.Fragment>
  );
}

export default Home;

Home.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  // if (res) {
  //   if (Object.keys(data).length === 0 && data.constructor === Object) {
  //     res.writeHead(301, { Location: "/" });
  //     res.end();
  //   }
  // }

  return {
    data: data && data,
  };
};

// an alternative to above approach
// Second
// import cookie from "js-cookie";
// export function getServerSideProps({ req, res }) {
//   return { props: { data: req.cookies.user || "" } };
// }

// Third
// export const getServerSideProps = async (context) => {
//   const data = parseCookies(context.req);

//   if (res) {
//     if (Object.keys(data).length === 0 && data.constructor === Object) {
//       context.res.writeHead(301, { Location: "/" });
//       context.res.end();
//     }
//   }

//   return {
//     props: {
//       data: data && data,
//     },
//   };
// };
