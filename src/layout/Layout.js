import React from "react";
import Meta from "../Meta";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export const Layout = (props) => {
  // to make it optional for some pages if not auth props is not provided
  // ({ children, auth }) => {

  const sections = [
    { title: "Technology", url: "#" },
    { title: "Design", url: "#" },
    { title: "Culture", url: "#" },
    { title: "Business", url: "#" },
    // { title: 'Politics', url: '#' },
    // { title: 'Opinion', url: '#' },
    // { title: 'Science', url: '#' },
    // { title: 'Health', url: '#' },
    // { title: 'Style', url: '#' },
    // { title: 'Travel', url: '#' },
  ];

  return (
    <>
      <Meta />
      <Header
        title="Etao Software Solutions"
        sections={sections}
        auth={props.auth}
      />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
