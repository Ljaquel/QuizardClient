import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/" exact={true} >{user ? user.username : "Home"}</NavLink>
            </li>
          </ul>
          {!user ?
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>
              </li>
            </ul>
          :
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-secondary text-light" onClick={logout}>Logout</button>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  )
}
