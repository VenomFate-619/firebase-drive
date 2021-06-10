import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function logout()
  {
      return auth.signOut()
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  function updateEmail(email)
  {
    return currentUser.updateEmail(email)
  }
  function updatePassword(pass)
  {
    return currentUser.updatePassword(pass)
  }

  useEffect(() => {
    console.log("running auth app");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
    updateEmail,
    loading
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? (<p>Loading from auth context</p>) : (children)}
    </AuthContext.Provider>
  );
}
