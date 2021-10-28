import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown,Button} from 'react-bootstrap'


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

             
            <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                        AB
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  <Dropdown.Item onClick={logout}>LogOut</Dropdown.Item> 
                  </Dropdown.Menu>
            </Dropdown>
           

      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"></link>
            
    </nav>
    
  )
}
