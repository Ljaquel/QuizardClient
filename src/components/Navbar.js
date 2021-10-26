import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Link, BrowserRouter as Router } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-brand" to="/">{user ? user.username : "Home"}</Link>
              </li>
            </ul>
            {!user ?
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/register">Register</Link>
                </li>
              </ul>
            :
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button className="btn btn-secondary nav-link active" style={{cursor:"pointer"}} onClick={logout}>Logout</button>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>
    </Router>
  )
}
