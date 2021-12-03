import React, { useContext, useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import Axios from 'axios'
import { Image } from 'cloudinary-react'
import { Modal, Button } from "react-bootstrap";
import { MdOutlineEdit,MdCancel } from 'react-icons/md';


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
  const handleChangeName = () =>updateName({ variables: { userId: contextUserId, update: { name: newName} }})
  const [show, setShow] = useState(false); 
  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);
  
  const [showChangeName,     setShowChangeName] = useState(true); 
  const [showChangeUserName, setShowChangeUserName] = useState(true); 
  const [showChangePassword, setShowChangePassword] = useState(true); 

  const handleShowChangeName = () => {setShowChangeName(!showChangeName)};
  const handleShowChangeUserName = () => {setShowChangeUserName(!showChangeUserName)};
  const handleShowChangePassword = () => {setShowChangePassword(!showChangePassword)};
 
  
  if(!user) return <Loading />

  return (
    <div className="container-sm  ms-0 me-0">
      
      <div className='row' >
        <div className='col-3 vh-100 d-flex flex-column' style={{backgroundColor: user.color}}>
          <button className="btn floating-edit-icon rounded ms-auto d-flex me-0 mb-1"  onClick={handleShow}>
            <MdOutlineEdit size="18"/> 
          </button> 
          {user.avatar.publicId? 
            <Image className="rounded-circle d-flex ms-auto me-auto" style={{border:"solid"}} cloudName="ljaquel"  width="200" height="200" crop="fill" radius="max" publicId={user.avatar.publicId}/> 
            :<img  className="d-flex ms-auto me-auto" style={{border:"solid"}} width="200" height="200" src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg" alt="Default Profile"/>          
          }  
          <h3 className="d-flex ms-auto me-auto">{user.name}</h3>
          <h3 className="d-flex ms-auto me-auto">@{user.username}</h3>
         
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxWidth: "700px" }}>
            <div className="m-3 row justify-content-center">
              <label className="form-label col-5 ms-0 me-auto ">Delete Current Avatar:</label>
              <Button className="btn btn-danger btn-sm col-3 ms-auto me-auto" style={{ height: "fit-content" }} disabled={!user.avatar?.publicId} onClick={() => [updateImage(true),handleClose()]} type="button">delete</Button>
              <br />
              <label className="form-label cl-10 input-group-sm p">Choose Avatar Image:</label>
              <input type="file" className="w-auto cl-2 form-control"  id="avatarFile" onChange={e => setImageState(e.target.files[0])}></input>      
            </div>            
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel </Button>
          <Button className="btn btn-primary" type="button" onClick={() =>  [updateImage(false), handleClose()] } disabled={!imageState || imageState===""}> Upload </Button>        
        </Modal.Footer>
      </Modal>
        
        </div>
        <div className='col-8 ms-auto mb-auto' >
          <h2>Account</h2>
          <div className="ms-lg-3 rounded shadow" style={{ background: "rgb(210 216 218)"  }}>

            <h5 className= "ps-3 mb-0">Name:</h5>            
            <div className="col-lg-8 input-group d-flex justify-content-between" >            
              {showChangeName? <>
                <p className="ms-5 mt-auto mb-auto"> {user.name} </p>                
                <button className="btn floating-edit-icon rounded"  onClick={handleShowChangeName}> <MdOutlineEdit size="18"/> </button>               
              </>
              :<>            
                <input value={newName} type="text" onChange={e => setNewName(e.target.value)} className="border-white ms-5 mt-auto mb-auto" 
                placeholder={"New Name"} aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div>
                  <Button onClick={() => [handleChangeName(),handleShowChangeName()]} className="btn btn-primary" type="button" id="button-addon2">Change Name</Button>
                  <Button onClick={() => [handleShowChangeName()]} className="btn btn-danger" type="button" id="button-addon2"><MdCancel size="18"/> </Button>
                </div>          
              </>}
            </div>  

            <hr className="m-0 bg-black opacity-100" style={{ height: "2px" }}/>
            <h5 className= "ps-3 mb-0">Username:</h5>   
            
            <div className="col-lg-8 input-group d-flex justify-content-between">
              {showChangeUserName?<>       
                <p className="ms-5 mt-auto mb-auto"> {user.username} </p>   
                <button className="btn floating-edit-icon rounded"  onClick={handleShowChangeUserName}> <MdOutlineEdit size="18"/> </button>               
              </>
              :<>                           
                <input value={newUserName} type="text" onChange={e => setNewUserName(e.target.value)} className="border-white ms-5 mt-auto mb-auto" placeholder={"New UserName"} autoComplete="off" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div>
                  <Button onClick={() => [handleChangeUserName(),handleShowChangeUserName()] } className="btn btn-primary" type="button" id="button-addon2">Change UserName</Button>
                  <Button onClick={() => [handleShowChangeUserName()]} className="btn btn-danger" type="button" id="button-addon2"><MdCancel size="18"/> </Button>
                </div>  
              </>              }
            </div>

            <hr className="m-0 bg-black opacity-100" style={{ height: "2px" }}/>            
            <h5 className= "ps-3 mb-0">Password:</h5>   
            {showChangePassword?
            <>
              <div className="col-lg-8 input-group d-flex justify-content-between">                 
                <p className="ms-5 mt-auto mb-auto"> ******** </p>       
                <button className="btn floating-edit-icon rounded"  onClick={handleShowChangePassword}> <MdOutlineEdit size="18"/> </button>     
              </div>
              <span>{status}</span>
            </>
            : <>  
              <div className="input-group ms-auto me-auto d-flex mt-auto mb-auto">
                <form className="ms-auto me-auto">
                  <div class="form-group d-flex">
                    <label className="col-5" >New Password</label>
                    <input type="password"  autoComplete="off" value ={newPassword} className="form-control" placeholder="Enter New Password" aria-describedby="basic-addon1" onChange={e => setNewPassword(e.target.value)}/>                   
                  </div>
                  <div class="form-group d-flex">
                    <label className="col-5">Confirm Password</label>
                    <input value={confirmPassword} type="password" autoComplete="off" onChange={e => setConfirmPassword(e.target.value)} className="form-control" placeholder="Confirm Password" aria-describedby="button-addon2"/>
                  </div>
                  <div className="mt-2 ms-auto" style={{width:"fit-content"}}>
                    <Button onClick={() => [changeP(),handleShowChangePassword()]} className="btn btn-primary d-inline me-auto" type="button" id="button-addon2">Submit</Button>
                    <Button onClick={() => [handleShowChangePassword(),setStatus('')]} className="btn btn-danger d-inline me-auto" type="button" id="button-addon2"><MdCancel size="18"/> </Button> 
                  </div>                 
                </form> 
              </div> 
            </>}

            <hr className="bg-black opacity-100 m-0" style={{ height: "2px" }}/>
            <h5 className= "ps-3 mb-0">Theme:</h5>  
            <div className=" mt-2 pb-2 d-flex col-lg-8 input-group d-flex justify-content-between">
              <p className="ms-5 mt-auto mb-auto"> Theme Color: </p>             
              <input type="color" className="" value={user.color} onChange={e => updateUser({ variables: { userId: contextUserId, update: {color: e.target.value}}})}></input>                 
            </div>            
          </div>

        </div>        
      </div>      
    </div>
  )
}

export default Settings
