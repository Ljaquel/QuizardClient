import React, { useContext,useState } from 'react'
import { AuthContext } from '../context/auth'
import { NavLink, useHistory } from "react-router-dom"
import { Dropdown } from 'react-bootstrap'
import '../styles/Navbar.css'

const Navbar=(props) =>{
  const [values, setValues] = useState({
    userInput: "", 
    error: null,
  });

  const onChange = (e) => {
    if (values.error) {
      setValues({ ...values, [e.target.name]: e.target.value, error: null });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  const SearchbtClicked=()=>{ 
    if (!values.userInput==''){
      console.log(values.userInput)
      history.push('/searchscreen')
    }
    else
      console.log("Empty userInput") 
  };

  const { user, logout } = useContext(AuthContext)
  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-container p-1 bg-dark">
      <div className="container-fluid px-2">
        <div className="collapse navbar-collapse">
          {user&& 
            <ul className="navbar-nav mb-2 mb-lg-0"  >
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact={true} >Home</NavLink>
              </li>
            </ul>
          } 
          {user &&
          <ul className="texField">
            <input 
                required
                type="text"
                placeholder="Quiz Name" 
                name="userInput"
                value={values.userInput}
                onChange={onChange} 
              /> 
            <button onClick={SearchbtClicked}>Search</button> 
          </ul>
          } 
          {!user
          ?
            <ul className="navbar-nav loginRegisterBtns">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>
              </li>
            </ul>
          :
            <Dropdown className="myclass">
              <Dropdown.Toggle variant="success" size={"sm"} id="dropdown-basic">
                {user.username[0].toUpperCase()}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push('/profile')}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => history.push('/settings')}>Settings</Dropdown.Item> 
                <Dropdown.Item onClick={logout} className="text-dark">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          } 
        </div>
      </div>
    </nav>
  )
}
export default Navbar;