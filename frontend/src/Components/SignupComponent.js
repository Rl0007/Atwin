import React, { useContext, useState } from "react";
import "./SignupComponent.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Assets/Context/AuthContext";

import Spinner from "react-bootstrap/Spinner";

function SignupComponent() {
  const navigate = useNavigate();
  const [status, setstatus] = useState(null);
  let { signupUser, signupspinner } = useContext(AuthContext);
  const [radio, setradio] = useState(false);
  function show_password() {
    setradio(!radio);
    var pass = document.getElementById("formBasicPassword");
    var re_pass = document.getElementById("formBasicPassword1");
    if (pass.type === "password") {
      pass.type = "text";
      re_pass.type = "text";
    } else {
      pass.type = "password";
      re_pass.type = "password";
    }
  }

  if (status === 201) {
    return (
      <p style={{ color: "white" }}>
        Check your email to activate your account !!!
      </p>
    );
  }
  return (
    <div>
      <div className="signup_form_container">
        <h2 className="sign_up">Please sign up</h2>
        <Form
          onSubmit={async (e) => {
            setstatus(await signupUser(e));
          }}
        >
          <Form.Group className="mb-2" controlId="formBasicname">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPassword1">
            <Form.Control
              type="password"
              name="re_password"
              placeholder="Confirm Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
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
          {signupspinner ? (
            <Spinner animation="border" variant="secondary" />
          ) : (
            <>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="primary"
                type="button"
                className="login_button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

export default SignupComponent;
