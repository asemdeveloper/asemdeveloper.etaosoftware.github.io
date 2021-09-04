// import axios from "axios";
import Cookies from "js-cookie";
// import cookie from "cookie";
// import { useCookies } from "react-cookie";
import { server } from "../config";

////////////////

export default class apiService {
  static logoutUser() {}

  static loginUser(body) {
    // CSRF TOKEN
    const csrftoken = Cookies.get("csrftoken");

    return (
      fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        credentials: "include", // necessary if cookie - token is sent from backend
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(body),
      })
        // .then((response) => response.json());
        .then((response) => {
          // console.log("Response : ", response);
          if (!response.ok) {
            // throw new Error(response.status);
            alert("Error : " + response.status + " Url " + response.statusText);
          } else return response.json();
        })
        .catch((error) => {
          // console.log("error: " + error);
          return alert("Error : " + error.toString());
          // this.setState({ requestFailed: true });
        })
    );
  }

  static getCurrentUser(data) {
    return (
      fetch(`http://localhost:8000/api/user`, {
        method: "GET",
        credentials: "include",
        // withCredentials: true, // In a POST request, the HttpOnly cookie will also be sent to the server, because of the withCredentials parameter being set to true.
        headers: {
          "Content-type": "application/json",
          // Authorization: "Bearer " + data.access,
          // "Set-Cookie": cookie.serialize("user", data.user_id, {
          //   httpOnly: true,
          //   secure: process.env.NODE_ENV !== "development",
          //   maxAge: 60 * 60,
          //   sameSite: "strict",
          //   path: "/",
          // }),
        },
      })
        // .then((response) => response.json());
        .then((response) => {
          // console.log("Response : ", response);
          if (!response.ok) {
            // throw new Error(response.status);
            alert("Error : " + response.status + " Url " + response.statusText);
          } else return response.json();
        })
        .catch((error) => {
          // console.log("error: " + error);
          return alert("Error : " + error.toString());
          // this.setState({ requestFailed: true });
        })
    );
  }

  static getUserArticles(data) {
    return (
      fetch(`http://localhost:8000/api/user`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + data.access,
          // "Set-Cookie": cookie.serialize("user", data.user_id, {
          //   httpOnly: true,
          //   secure: process.env.NODE_ENV !== "development",
          //   maxAge: 60 * 60,
          //   sameSite: "strict",
          //   path: "/",
          // }),
        },
      })
        // .then((response) => response.json());
        .then((response) => {
          // console.log("Response : ", response);
          if (!response.ok) {
            // throw new Error(response.status);
            alert("Error : " + response.status + " Url " + response.statusText);
          } else return response.json();
        })
        .catch((error) => {
          // console.log("error: " + error);
          return alert("Error : " + error.toString());
          // this.setState({ requestFailed: true });
        })
    );
  }

  static registerUser(body) {
    return fetch(`http://localhost:8000/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static insertArticle(body, token) {
    let cancelToken; // Imp - Axios API Optimization - used to prevent previous API call to same Route if there is a new API call to same Route

    // if (typeof cancelToken != typeof undefined) {
    //   cancelToken.cancel("Cancelling the previous API request !");
    // }

    // cancelToken = axios.CancelToken.source();

    return fetch(`http://localhost:8000/api/articles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static updateArticle(article_id, body, token) {
    return fetch(`http://localhost:8000/api/articles/${article_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static deleteArticle(article_id, token) {
    return fetch(`http://localhost:8000/api/articles/${article_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }
}
