import React, { useContext,useState } from 'react'
import { useMutation } from '@apollo/client';

import { CHANGE_PASSWORD,UPDATE_USER_MUTATION } from '../Calls'
import { AuthContext } from '../context/auth';

const Settings = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('')

  const[newNameStatus,setnewNameStatus]= useState('')
  const [newName,setNewName] = useState('')

  const [newUserName,setNewUserName] = useState('')
  const [newUserNameStatus,setnewUserNameStatus]= useState('')

  const {user,update:updateUserContext} = useContext(AuthContext) 
  
  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted() {
      setNewPassword('')
      setConfirmPassword('')
      setStatus('Success')
    },
    onError(err) {
      console.log(err)
      setStatus('Error')
    },
    variables: {newPassword: newPassword, confirmPassword: confirmPassword}
  });

  const [ updateUserName ] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted(){
      setNewUserName('')
      setnewUserNameStatus('success')
    },
    onError(err) { 
      setnewNameStatus('Error')
      console.log(JSON.stringify(err, null, 2)) },
    variables: {}
  });

  const [ updateName ] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted(){
      setNewName('')
      setnewNameStatus('success')
    },
    onError(err) { 
      setnewNameStatus('Error')
      console.log(JSON.stringify(err, null, 2)) },
    variables: {}
  }); 
  const changeP = () => { 
    changePassword()
  }
  const handleChangeUserName= ()=>{   
    const username = { username: newUserName }
    updateUserName({ variables: { fields: username }})
    updateUserContext(username)
  } 

  const handleChangeName= ()=>{   
    const name = { name: newName }
    updateName({ variables: { fields: name }})
    updateUserContext(name)
  } 

  return (
    <div className="container-sm">
      <h1>Settings</h1> 
      <h2>Name: {user.name}</h2>
      <h2>Username: {user.username}</h2>


      {newNameStatus==='success'&& <span style={{color:'green'}}>{newNameStatus}</span> } 
      <div className="input-group mb-3">
        <input value={newName} type="text" onChange={e => setNewName(e.target.value)} className="form-control" placeholder={"New Name"} aria-label="Recipient's username" aria-describedby="button-addon2"/>
        <button onClick={() => handleChangeName()} className="btn btn-outline-secondary" type="button" id="button-addon2">Change Name</button>
      </div> 

      {newUserNameStatus==='success'&& <span style={{color:'green'}}>{newUserNameStatus}</span> } 
      <div className="input-group mb-3">
        <input value={newUserName} type="text" onChange={e => setNewUserName(e.target.value)} className="form-control" placeholder={"New UserName"} aria-label="Recipient's username" aria-describedby="button-addon2"/>
        <button onClick={() => handleChangeUserName()} className="btn btn-outline-secondary" type="button" id="button-addon2">Change UserName</button>
      </div> 

      <span>{status}</span>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">New Password</span>
        <input type="password"  value ={newPassword} className="form-control" placeholder="New Password" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setNewPassword(e.target.value)}/>
      </div>
      <div className="input-group mb-3">
        <input value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} className="form-control" placeholder="Confirm Password" aria-label="Recipient's username" aria-describedby="button-addon2"/>
        <button onClick={() => changeP()} className="btn btn-outline-secondary" type="button" id="button-addon2">Change Password</button>
      </div> 
    </div>
  )
}

export default Settings
