import cookie from "cookie";

// setup a function that will check if the cookie exists on the server, parse the cookie and return it
export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export const checkCurrenUserStatus = () => {
  let user_data = null;

  const isServer = typeof window === "undefined";
  if (!isServer) {
    if (
      window.sessionStorage.getItem("user_data") !== null ||
      window.sessionStorage.getItem("user_data") !== "undefined"
    ) {
      user_data = JSON.parse(window.sessionStorage.getItem("user_data"));
    }

    return user_data;
  }
  return null;
};
