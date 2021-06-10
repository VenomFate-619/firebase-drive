import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  var { currentUser } = useAuth();
  return currentUser && (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  ) 
}
