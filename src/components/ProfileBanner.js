import React, { useContext } from "react";
import { AuthContext } from '../context/auth'
import CreateQuizPopUp from '../components/CreateQuizPopUp'; 

const ProfileBanner = ({addQuiz}) => {
  const { user } = useContext(AuthContext);

  return(
    <div className="row">
      <div className="col-auto mx-5 my-3">
        <h1>{user?.username} - Created Quizzes</h1>
      </div>
      <div className="col">

      </div>
      <div className="col-2 mt-4">
        <CreateQuizPopUp addQuiz={addQuiz}/>
      </div>
    </div>
  )
}

export default ProfileBanner