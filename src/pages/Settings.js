import React, { useContext, useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import Axios from 'axios'
import { Image } from 'cloudinary-react'

import Loading from '../components/Loading'
import { CHANGE_PASSWORD, UPDATE_USER, UPDATE_IMAGE, FETCH_USER_QUERY } from '../Calls'
import { AuthContext } from '../context/auth';

const Settings = () => {
  const {contextUserId} = useContext(AuthContext)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('')
  const [newNameStatus, setnewNameStatus]= useState('')
  const [newName, setNewName] = useState('')
  const [newUserName, setNewUserName] = useState('')
  const [newUserNameStatus, setnewUserNameStatus]= useState('')
  const [imageState, setImageState] = useState("")

  const { data:userData, refetch} = useQuery(FETCH_USER_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { userId: contextUserId }
  })
  const user = userData?.getUser

  const [ updateAvatar ] = useMutation(UPDATE_IMAGE, {
    onCompleted() { setImageState(''); refetch() },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { type: "User",  _id: contextUserId, field: "avatar" }
  })

  const updateImage = async(deletion) => {
    let publicId = null
    let url = null

    if(!deletion) {
      const formData = new FormData()
      formData.append("file", imageState)
      formData.append("upload_preset", "quizard")
      const res = await Axios.post("https://api.cloudinary.com/v1_1/ljaquel/image/upload", formData)
      publicId = res.data.public_id
      url = res.data.url
    }
    else { publicId = ""; url = "" }

    updateAvatar({ variables: { publicId, url }})
  }
  
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

  const [ updateUser ] = useMutation(UPDATE_USER, {
    onCompleted() { refetch() },
    onError(err) { console.log(JSON.stringify(err, null, 2)) }
  });

  const [ updateUserName ] = useMutation(UPDATE_USER, {
    onCompleted(){ setNewUserName(''); setnewUserNameStatus('success'); refetch() },
    onError(err) { 
      setnewNameStatus('Error')
      console.log(JSON.stringify(err, null, 2)) },
    variables: {}
  });

  const [ updateName ] = useMutation(UPDATE_USER, {
    onCompleted(){ setNewName(''); setnewNameStatus('success'); refetch() },
    onError(err) { 
      setnewNameStatus('Error')
      console.log(JSON.stringify(err, null, 2)) }
  })

  useEffect(() => { refetch() }, [refetch]);

  const changeP = () => changePassword() 
  const handleChangeUserName = () => updateUserName({ variables: { userId: contextUserId, update: {username: newUserName} }})
  const handleChangeName = () => updateName({ variables: { userId: contextUserId, update: { name: newName} }})
  
  if(!user) return <Loading />

  return (
    <div className="container-sm">
      <h1>Settings</h1>
      {user.avatar.publicId && <Image cloudName="ljaquel"  width="200" height="200" crop="fill" radius="max" publicId={user.avatar.publicId}/> } 
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
        <input type="password"  value ={newPassword} className="form-control" placeholder="New Password" aria-describedby="basic-addon1" onChange={e => setNewPassword(e.target.value)}/>
      </div>
      <div className="input-group mb-3">
        <input value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} className="form-control" placeholder="Confirm Password" aria-describedby="button-addon2"/>
        <button onClick={() => changeP()} className="btn btn-outline-secondary" type="button" id="button-addon2">Change Password</button>
      </div> 


      <div className="row px-2 mt-4">
        <div className="col">
          <span className="mx-1">Avatar:</span>
        </div>
        <div className="col col-12">
          <div className="input-group input-group-sm">
            <input type="file" className="form-control" id="avatarFile" onChange={e => setImageState(e.target.files[0])}></input>
            <button className="btn btn-outline-secondary" type="button" onClick={() =>  updateImage(false) } disabled={!imageState || imageState===""}>Upload</button>
            <button className="btn btn-outline-secondary" disabled={!user.avatar?.publicId} onClick={() => updateImage(true)} type="button">x</button>
          </div>
        </div>
      </div>

      <div className="row px-2 mt-4">
        <div className="col col-auto">
          <span className="mx-1">Theme Color:</span>
        </div>
        <div className="col col-auto w-25">
          <div className="input-group input-group-sm">
            <input type="color" className="form-control" value={user.color} onChange={e => updateUser({ variables: { userId: contextUserId, update: {color: e.target.value}}})}></input>
          </div>
        </div>
      </div>
          

    </div>
  )
}

export default Settings
