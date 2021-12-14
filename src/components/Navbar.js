import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth'
import { NavLink, useHistory } from "react-router-dom"
import { Dropdown } from 'react-bootstrap'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import { FETCH_USER_QUERY, FETCH_NOTIFICATIONS, UPDATE_NOTIFICATION_MUTATION } from '../Calls';
import { MdSearch, MdNotificationsNone } from "react-icons/md";

const Navbar=() =>{
  const { contextUserId, logout } = useContext(AuthContext)
  const [getUser, { data }] = useLazyQuery(FETCH_USER_QUERY, { onError(err) {console.log(JSON.stringify(err, null, 2))},variables: { userId: contextUserId } });

  const { data:notificationsData, refetch:refetchNotis } = useQuery(FETCH_NOTIFICATIONS, { onError(err) {console.log(JSON.stringify(err, null, 2))}, variables: { filters: { to: contextUserId } } });
  const notifications = notificationsData ? notificationsData.getNotifications : []

  const [updateNotification] = useMutation(UPDATE_NOTIFICATION_MUTATION, {
    onError(err) {console.log(JSON.stringify(err, null, 2))},
    onCompleted() { refetchNotis() },
    variables: { }
  });

  let totalUnseen = 0
  for(let i = 0; i < notifications.length; i++) {
    if(!notifications[i].seen) totalUnseen++
  }
  
  useEffect(() => {
    if(contextUserId) getUser({ variables: {userId: contextUserId}})
  }, [getUser, contextUserId]);

  const user = data?.getUser;
  
  const history = useHistory();

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      className="pointer"
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));

  return (
    <nav className="navbar navbar-expand navbar-dark nav-container p-1 bg-dark">
      <div className="container-fluid px-2">

        <div className="collapse navbar-collapse">

          {contextUserId &&
            <ul className="navbar-nav me-auto" >
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact={true}> Quizard </NavLink>
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
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/searchscreen"><MdSearch size={30}/></NavLink>
                </li>
                <li className="nav-item pe-3">
                  <Dropdown className="myclass nav-link">
                    <Dropdown.Toggle as={CustomToggle} className="relative" size={"sm"} id="dropdown-basic">
                      <MdNotificationsNone size={27}/>
                      {totalUnseen > 0 && <span style={{top: '13px', padding: '2px 4px 2px 4px'}} className="position-absolute start-92 translate-middle badge rounded-pill bg-danger">
                        {totalUnseen}
                        <span className="visually-hidden">unread messages</span>
                      </span>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      {notifications?.length > 0 &&
                        notifications.map((n, i) => 
                          <Dropdown.Item key={i} onClick={() => {
                              updateNotification({variables: {notificationId: n._id, seen: true}});
                              history.push('/quizscreen/'+n.subject._id)
                            }}>
                            {!n.seen && <span className="badge rounded-pill bg-light text-dark me-2">New</span>}
                            {n?.message}
                          </Dropdown.Item>
                        )
                      }
                      {notifications?.length === 0 && <Dropdown.Item>No News</Dropdown.Item>}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>



              <Dropdown className="myclass">
                <Dropdown.Toggle variant="light" size={"sm"} id="dropdown-basic" style={{backgroundColor: user?.color, borderColor:user?.color}}>
                  {user?.username}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                  <Dropdown.Item onClick={() => history.push('/profile/'.concat(contextUserId))}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => history.push('/settings')}>Settings</Dropdown.Item> 
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
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