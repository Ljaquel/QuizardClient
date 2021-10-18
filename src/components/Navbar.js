import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="navbar-brand" aria-current="page" href="/">{user ? user.username : "Home"}</a>
            </li>
          </ul>
          {!user ?
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/register">Register</a>
              </li>
            </ul>
          :
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-secondary nav-link active" aria-current="page" style={{cursor:"pointer"}} onClick={logout}>Logout</button>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  )
}
