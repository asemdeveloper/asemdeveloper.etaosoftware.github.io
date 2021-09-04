import React from "react";
import ContactUs from "../components/Contact/ContactUs";
import { parseCookies } from "../utils";

function ContactUsPage({ data }) {
  return (
    <React.Fragment>
      <ContactUs />
    </React.Fragment>
  );
}

export default ContactUsPage;

// ContactUsPage.getInitialProps = async ({ req, res }) => {
//   const data = parseCookies(req);

//   // if (res) {
//   //   if (Object.keys(data).length === 0 && data.constructor === Object) {
//   //     res.writeHead(301, { Location: "/" });
//   //     res.end();
//   //   }
//   // }

//   return {
//     data: data && data,
//   };
// };
