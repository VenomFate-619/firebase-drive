import React  from "react";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Profile from "./authentication/Profile";
import ForgetPassword from "./authentication/ForgetPassword";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import UpdateProfile from "./authentication/UpdateProfile";

// googleDrive
import Dashboard from './googleDrive/Dashboard'

export default function App() {
  
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            {/* drive  */}
            <PrivateRoute exact path="/" component={Dashboard} />
            {/* drive Folder */}
            <PrivateRoute exact path="/folders/:folderId" component={Dashboard} />
            {/* Profile changes */}
            <PrivateRoute path="/user" component={Profile}  />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            {/* Auth */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forget-password" component={ForgetPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}
