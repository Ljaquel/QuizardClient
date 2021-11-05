import React, { useState } from 'react'

import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../Calls'

const Settings = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('')
  
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

  const changeP = () => {
    console.log("changing pass")
    changePassword()
  }

  return (
    <div className="container-sm">
      <h1>Settings</h1>
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
