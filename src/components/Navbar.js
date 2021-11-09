import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { NavLink, useHistory } from "react-router-dom"
import { Dropdown } from 'react-bootstrap'

const Navbar=() =>{
  const { user, logout } = useContext(AuthContext)
  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-container p-1 bg-dark">
      <div className="container-fluid px-2">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact={true} >Home</NavLink>
            </li>
          </ul>
          {!user
          ?
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>
              </li>
            </ul>
          :
            <>
              <ul className="navbar-nav">
                <li className="nav-item me-3">
                  <NavLink className="nav-link" activeClassName="active" to="/searchscreen">Search</NavLink>
                </li>
              </ul>
              <Dropdown className="myclass">
                <Dropdown.Toggle variant="success" size={"sm"} id="dropdown-basic">
                  {user.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => history.push('/profile')}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => history.push('/settings')}>Settings</Dropdown.Item> 
                  <Dropdown.Item onClick={logout} className="text-dark">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          } 
        </div>
      </div>
    </nav>
  )
}
export default Navbar;