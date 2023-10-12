// import { Button } from "@mui/material";
import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import AuthContext from "../Assets/Context/AuthContext";

function ActivateAccountComponent() {
  const navigate = useNavigate();
  const params = useParams();
  const [status, setstatus] = useState(null);
  const { verify_user, verfiy_user_spinner } = useContext(AuthContext);
  const activate = () => {
    let data = verify_user(params.uid, params.token).then((response) => {
      setstatus(response);
    });
  };
  const renderswitch = (param) => {
    switch (param) {
      case 204:
        return (
          <div style={{ color: "white" }}>
            Your Account is activated{" "}
            <p
              onClick={() => navigate("/login")}
              style={{ color: "lightblue", cursor: "pointer" }}
            >
              Click here{" "}
            </p>{" "}
            to go to login page !!!
          </div>
        );
      case 403:
        return (
          <div>
            Account is already registered{" "}
            <p onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
              Click here{" "}
            </p>{" "}
            to go to login page !!!
          </div>
        );
      case null:
        return (
          <>
            {verfiy_user_spinner ? (
              <Spinner animation="border" variant="secondary" />
            ) : (
              <Button onClick={() => activate()} style={{ color: "white" }}>
                Click to activate account
              </Button>
            )}
          </>
        );
      default:
        return (
          <div>
            An error occured please try again later{" "}
            <p onClick={() => navigate("/")}>Click here </p> to go to home page
            !!!
          </div>
        );
    }
  };

  return <div>{renderswitch(status)}</div>;
}

export default ActivateAccountComponent;
