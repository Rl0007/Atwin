import React, { useContext, useState } from "react";
import "./LoginComponent.css";
// import meta_logo from "./meta_logo_3.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/SportsIcons/men-pose.png";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import AuthContext from "../Assets/Context/AuthContext";

function LoginComponent() {
  const navigate = useNavigate();
  let { loginUser, loginspinner } = useContext(AuthContext);
  const [radio, setradio] = useState(false);

  function show_password() {
    setradio(!radio);
    var pass = document.getElementById("formBasicPassword3");

    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  }
  return (
    <div>
      <div className="login_form_container">
        <h2 className="sign_up">Login</h2>
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="Radio"
              checked={radio}
              style={{
                color: "white",

                textAlign: "left",
              }}
              id="show_password"
              readOnly
              label="Show password"
              onClick={() => {
                show_password();
              }}
            />
          </Form.Group>
          {loginspinner ? (
            <Spinner animation="border" variant="secondary" />
          ) : (
            <>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button
                variant="primary"
                className="signup_button"
                type="button"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                sign up
              </Button>
            </>
          )}
        </Form>
        <p className="mt-3 mb-3 " style={{ color: "white" }}>
          Forgot Password ?{" "}
          <Link
            to="/send_reset_password_link"
            style={{ color: "black", textDecoration: "None" }}
          >
            Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;
