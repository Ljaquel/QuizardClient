import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';


import { AuthContext } from '../context/auth';
import ProfileBanner from '../components/ProfileBanner'
import ProfileQuizArea from '../components/ProfileQuizArea'
import CreateQuizPopUp from '../components/CreateQuizPopUp'; 
import { CREATE_QUIZ, FETCH_QUIZZES_QUERY } from '../Calls';

const Profile = (props) => {
      const { user } = useContext(AuthContext)
 
  return (
    <div className="container-fluid">
          <ProfileBanner username={user.username}/> 
          <ProfileQuizArea />
    </div>
  )
}


export default Profile;