import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import { useParams, Redirect } from 'react-router-dom'
import { gql, useQuery, useMutation } from '@apollo/client';
import Workspace from '../components/Workspace';
import BuilderSideBar from '../components/BuilderSideBar';
import Description from '../components/Description';
import Loading from '../components/Loading';
import PageNotFound from '../pages/PageNotFound';
import ProfileBanner from '../components/ProfileBanner'
import ProfileQuiz from '../components/ProfileQuiz'

const Profile = (props) => {
      const { user, logout } = useContext(AuthContext)
 
 
  return (
    <div className="container-fluid">
          <ProfileBanner username={user.username}/>
          <ProfileQuiz />

 
    </div>
  )
}


export default Profile;