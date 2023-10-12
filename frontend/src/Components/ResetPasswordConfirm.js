import React, { useContext, useState } from "react";
import AuthContext from "../Assets/Context/AuthContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import logo from "../incubator.png";
import Spinner from "react-bootstrap/Spinner";

import { useNavigate, useParams } from "react-router-dom";
function ResetPasswordConfirm() {
  const navigate = useNavigate();
  const params = useParams();
  const { reset_password_confirmation, password_confirm_spinner } =
    useContext(AuthContext);
  const [status, setstatus] = useState(null);
  const [radio, setradio] = useState(false);
  function show_password() {
    setradio(!radio);
    var pass = document.getElementById("formBasicpassword");
    var re_pass = document.getElementById("formBasicpassword1");
    if (pass.type === "password") {
      pass.type = "text";
      re_pass.type = "text";
    } else {
      pass.type = "password";
      re_pass.type = "password";
    }
  }
  if (status === 204) {
    return (
      <div style={{ color: "white" }}>
        Your password is changed{" "}
        <p
          onClick={() => navigate("/login")}
          style={{ color: "lightblue", cursor: "pointer" }}
        >
          Click here{" "}
        </p>{" "}
        to go to login page !!!
      </div>
    );
  }
  return (
    <div className="signup_form_container">
      <h2 className="sign_up">Enter Password</h2>

      <Form
        onSubmit={async (e) => {
          setstatus(
            await reset_password_confirmation(params.uid, params.token, e)
          );
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicpassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            // id="password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicpassword1">
          <Form.Control
            type="password"
            name="re_password"
            placeholder="Enter Password again"
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
            label="Show password"
            readOnly
            onClick={() => {
              show_password();
            }}
          />
        </Form.Group>
        {password_confirm_spinner ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}

export default ResetPasswordConfirm;
