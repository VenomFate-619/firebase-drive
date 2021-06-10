import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenterContainer from "./CenterContainer";

function UpdateProfile() {
  var emailRef = useRef();
  var passwordRef = useRef();
  var passwordConfirmRef = useRef();
  var { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user");
      })
      .catch(() => {
        setError("Failed to update");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && (
            <Alert variant="danger" dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
    </CenterContainer>
  );
}

export default UpdateProfile;
