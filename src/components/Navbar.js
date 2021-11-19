import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth'
import { NavLink, useHistory } from "react-router-dom"
import { Dropdown } from 'react-bootstrap'
import { useLazyQuery } from '@apollo/client'
import { FETCH_USER_QUERY } from '../Calls';

const Navbar=() =>{
  const { contextUserId, logout } = useContext(AuthContext)
  const [getUser, { data }] = useLazyQuery(FETCH_USER_QUERY, { onError(err) {console.log(JSON.stringify(err, null, 2))},variables: { userId: contextUserId } });

  useEffect(() => {
    if(contextUserId) getUser({ variables: {userId: contextUserId}})
  }, [getUser, contextUserId]);

  const user = data?.getUser;

  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-container p-1 bg-dark">
      <div className="container-fluid px-2">

        <div className="collapse navbar-collapse">

          {contextUserId &&
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact={true} >Home</NavLink>
              </li>
            </ul>
          }
          {!contextUserId
          ?
            <ul className="navbar-nav" style={{marginLeft:"auto"}}>
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
                  {user?.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => history.push('/profile/'.concat(contextUserId))}>Profile</Dropdown.Item>
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