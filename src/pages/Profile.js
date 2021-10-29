import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import ProfileBanner from '../components/ProfileBanner'
import ProfileQuizArea from '../components/ProfileQuizArea'

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