import React, { useContext } from "react";
import { AuthContext } from '../context/auth'
import CreateQuizPopUp from '../components/CreateQuizPopUp'; 

const ProfileBanner = (props) => {
  const {user: userContext } = useContext(AuthContext);
  const user=props.user
  if(!user) { return <div className="col-auto mx-5 my-3">  Not working </div> }
  return(
    <div className="row">
      <div className="col-auto mx-5 my-3"> 
        <h1>{user.name} - Created Quizzes</h1>        
      </div>
      <div className="col">

      </div>
       {user?.username === userContext?.username && <div className="col-2 mt-4"> <CreateQuizPopUp addQuiz={props.addQuiz}/> </div>} 
    </div>
  )
}

export default ProfileBanner