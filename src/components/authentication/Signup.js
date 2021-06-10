import React, { useRef, useState } from "react";
import { Form, Button, Card,Alert } from "react-bootstrap";
import { Link,useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenterContainer from "./CenterContainer";

function Signup() {
  var emailRef = useRef();
  var passwordRef = useRef();
  var passwordConfirmRef = useRef();
  var { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const history=useHistory()
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true);
       await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoading(false);
      history.push('/login')
    } catch (error) {
      console.log(error);
      setLoading(false);
      return setError("User cannot be created");
      
    }

    
  }
  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </CenterContainer>
  );
}

export default Signup;
