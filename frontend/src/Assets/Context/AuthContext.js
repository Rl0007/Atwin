import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setauthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setuser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [user_details, setuser_details] = useState(null);

  const [loginspinner, setloginspinner] = useState(false);
  const [signupspinner, setsignupspinner] = useState(false);
  const [verfiy_user_spinner, setverify_user_spinner] = useState(false);
  const [send_reset_password_spinner, set_send_reset_spinner] = useState(false);
  const [password_confirm_spinner, set_password_confirm_spinner] =
    useState(false);

  const get_user_details = async () => {
    if (authTokens) {
      let response = await fetch("http://localhost:8000/auth/users/me/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,

          Accept: "application/json",
        },
      });
      let user_details = await response.json();
      setuser_details(user_details);
    }
  };

  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  const loginUser = async (e) => {
    setloginspinner(true);
    e.preventDefault();
    const csrfToken = getCookie("csrftoken");

    try {
      let response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          email: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      let data = await response.json();

      if (response.status === 200) {
        setauthTokens(data);
        setuser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));

        navigate("/");
      } else {
        if (response.status === 401) {
          // setloginspinner(false);

          alert("Id or password does not exist !");
        }
      }
    } catch (error) {
      console.log(error);
    }

    setloginspinner(false);
  };

  const signupUser = async (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.re_password.value) {
      alert("Password does not match");
      e.target.password.value = "";
      e.target.re_password.value = "";

      return;
    }
    if (e.target.password.value.length < 8) {
      alert("Password too short please try another password");

      return;
    }

    setsignupspinner(true);

    try {
      const csrfToken = getCookie("csrftoken");

      let response = await fetch("http://localhost:8000/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          email: e.target.email.value,
          name: e.target.name.value,

          password: e.target.password.value,
          re_password: e.target.re_password.value,
        }),
      });
      let data = await response.json();

      if (data.password) {
        alert("Password very common please try another password");
        setsignupspinner(false);
        return;
      }
      if (response.status === 400) {
        alert("Account with this email or username already exist!!");
        setsignupspinner(false);
        return;
      }
      console.log(response);
      setsignupspinner(false);

      return response.status;
    } catch (error) {
      console.log("this is error", error);
      alert(error);
    }
    setsignupspinner(false);
  };

  const Send_reset_password_link = async (e) => {
    e.preventDefault();
    set_send_reset_spinner(true);

    try {
      const csrfToken = getCookie("csrftoken");

      let response = await fetch(
        "http://localhost:8000/auth/users/reset_password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          body: JSON.stringify({
            email: e.target.email.value,
          }),
        }
      );

      let data = response;

      set_send_reset_spinner(false);
      return response.status;
    } catch (error) {
      set_send_reset_spinner(false);

      alert(error);
    }
  };
  const reset_password_confirmation = async (uid, token, e) => {
    e.preventDefault();
    const csrfToken = getCookie("csrftoken");
    if (e.target.password.value !== e.target.re_password.value) {
      alert("Password does not match");
      e.target.password.value = "";
      e.target.re_password.value = "";

      return;
    }

    set_password_confirm_spinner(true);
    try {
      let response = await fetch(
        "http://localhost:8000/auth/users/reset_password_confirm/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          body: JSON.stringify({
            uid: uid,
            token: token,
            new_password: e.target.password.value,
          }),
        }
      );

      if (response.status === 400) {
        let data = await response.json();

        Object.entries(data).forEach((element) => {
          if (element[1][0] === "Invalid token for given user.") {
            alert("Please resend the activation link. This link is invalid.");
          } else {
            alert(element[1][0]);
          }
        });
      }
      set_password_confirm_spinner(false);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };
  const verify_user = async (uid, token) => {
    const csrfToken = getCookie("csrftoken");
    setverify_user_spinner(true);
    let response = await fetch("http://localhost:8000/auth/users/activation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ uid: uid, token: token }),
    });

    setverify_user_spinner(false);
    return response.status;
  };
  const logoutUser = () => {
    setauthTokens(null);
    setuser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };
  const updateToken = async () => {
    if (authTokens) {
      let response = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: authTokens?.refresh,
        }),
      });
      let data = await response.json();

      if (response.status === 200) {
        setauthTokens(data);
        setuser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }
    }
    if (loading) {
      setloading(false);
    }
  };

  let contextData = {
    authTokens: authTokens,
    user: user,
    user_details: user_details,
    loginUser: loginUser,
    logoutUser: logoutUser,
    signupUser: signupUser,
    Send_reset_password_link: Send_reset_password_link,
    verify_user: verify_user,
    reset_password_confirmation: reset_password_confirmation,
    loginspinner: loginspinner,
    signupspinner: signupspinner,
    verfiy_user_spinner: verfiy_user_spinner,
    send_reset_password_spinner: send_reset_password_spinner,
    password_confirm_spinner: password_confirm_spinner,
  };

  useEffect(() => {
    get_user_details();

    if (loading) {
      updateToken();
    }
    let tenmin = 1000 * 60 * 10;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, tenmin);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
