import React, { useContext } from "react";
import { AuthContext } from '../context/auth'
import CreateQuizPopUp from '../components/CreateQuizPopUp'; 
import { Image } from 'cloudinary-react'

const ProfileBanner = (props) => {
  const { contextUserId } = useContext(AuthContext);
  const user=props.user
  if(!user) { return <div className="col-auto mx-5 my-3">  Not working </div> }
  return(
    <div className="row">
      <div className="col col-12 mx-5 mt-3"> 
        <Image cloudName="ljaquel"  width="150" height="150" crop="fill" radius="max" publicId={user.avatar}/>      
      </div>
      <div className="col-auto mx-5 my-3"> 
        <h1>{user?.name} - Created Quizzes</h1>        
      </div>
      <div className="col">

      </div>
      <div className="col">
        {user?._id === contextUserId && <div className="col-2 mt-4"> <CreateQuizPopUp addQuiz={props.addQuiz}/> </div>}
      </div> 
    </div>
  )
}

export default ProfileBanner