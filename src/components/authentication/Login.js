import React, { useRef, useState } from "react";
import { Form, Button, Card,Alert } from "react-bootstrap";
import { Link , useHistory} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenterContainer from "./CenterContainer";

function Login() {
  var emailRef = useRef();
  var passwordRef = useRef();
  var { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const history=useHistory()
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
       await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoading(false);
      history.push('/')

    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }

    
  }
  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger" dismissible>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to='/forget-password'>Forget Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to='/signup'>Signup</Link>
      </div>
    </CenterContainer>
  );
}

export default Login;
