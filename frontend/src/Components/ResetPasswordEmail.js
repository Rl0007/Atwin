import React, { useContext, useState } from "react";
import AuthContext from "../Assets/Context/AuthContext";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
function ResetPasswordEmail() {
  const navigate = useNavigate();

  const { Send_reset_password_link, send_reset_password_spinner } =
    useContext(AuthContext);
  const [status, setstatus] = useState(null);
  const test = async (e) => {
    console.log(e.target.email.value);
  };
  if (status === 204) {
    return (
      <p style={{ color: "white" }}>Check your email to change password !!!</p>
    );
  }

  return (
    <div className="login_form_container">
      <h2 className="sign_up">Enter Email</h2>

      {send_reset_password_spinner ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <Form
          onSubmit={async (e) => {
            setstatus(await Send_reset_password_link(e));
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default ResetPasswordEmail;
