import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { NavLink, useHistory } from "react-router-dom"
import { Dropdown } from 'react-bootstrap'

const Navbar=() =>{
  const { user, logout } = useContext(AuthContext)

  const history = useHistory();
  const handleOnClick = () => history.push(`/profile/${user._id}`);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-1">
      <div className="container-fluid px-2">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/" exact={true} >Home</NavLink>
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
            
            <Dropdown className="myclass">
                   <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {user.username[0].toUpperCase()}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                        {/* <Link to={`/profile/${user._id}`} > PROFILE</Link> */}
                        <Dropdown.Item onClick={handleOnClick}>
                              Profile
                        </Dropdown.Item>  

                        <Dropdown.Item onClick={logout}>LogOut</Dropdown.Item>
                  </Dropdown.Menu>

            </Dropdown>
            

          } 
        </div>
      </div>

             
            
           

      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"></link>
            
    </nav>
    
  )
}
export default Navbar;