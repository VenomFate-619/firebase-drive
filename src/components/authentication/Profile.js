import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenterContainer from "./CenterContainer"

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser,logout } = useAuth()
  const history = useHistory()

  var handleLogout=async ()=>{
    setError(" ")
    try {
      await logout()
      history.push('/login')
    } catch (error) {
      setError("Failed to logout")
    }
   
  }
 

  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </CenterContainer>
  )
}