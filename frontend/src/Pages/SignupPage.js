import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";

import SignupComponent from "../Components/SignupComponent";
import LoginComponent from "../Components/LoginComponent";

import "./SignupPage.css";
import ResetPasswordEmail from "../Components/ResetPasswordEmail";

import ActivateAccountComponent from "../Components/ActivateAccountComponent";
import ResetPasswordConfirm from "../Components/ResetPasswordConfirm";

function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  let url_path = location.pathname;
  if (url_path.startsWith("/activate")) {
    url_path = "/activate";
  }
  if (url_path.startsWith("/reset_password_confirm")) {
    url_path = "/reset_password_confirm";
  }

  const renderSwitch = (param) => {
    switch (param) {
      case "/signup":
        return <SignupComponent />;
      case "/login":
        return <LoginComponent />;
      case "/send_reset_password_link":
        return <ResetPasswordEmail />;
      case "/reset_password_confirm":
        return <ResetPasswordConfirm />;
      case "/activate":
        return <ActivateAccountComponent />;
    }
  };
  return (
    <>
      <div className="topsvg">
        <div className="inner-header flex">
          <div className="Signup_page">{renderSwitch(url_path)}</div>
        </div>

        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      <div className="content flex">{/* <p>© 2022–2023 </p> */}</div>
    </>
  );
}

export default SignupPage;
