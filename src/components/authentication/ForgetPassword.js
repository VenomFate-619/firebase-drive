import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenterContainer from "./CenterContainer";

export default function ForgetPassword() {
  var emailRef = useRef();
  var { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [msg, setmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setmsg("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setLoading(false);
      setmsg("Check your inbox " + emailRef.current.value);
      //   history.push("/login");
    } catch (error) {
      console.log(error);
      setError("Failed to reset password");
      setLoading(false);
    }
  }
  return (
    <CenterContainer>
      <Card>
          
        <Card.Body>
          <h2 className="text-center mb-4 lead">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {msg && <Alert variant="success">{msg}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Button className="w-100" type="submit" disabled={loading}>
              Reset Password
            </Button>
            <div className="w-100 text-center mt-2">
              <Link to="/login">Login</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Signup</Link>
      </div>
    </CenterContainer>
  );
}
