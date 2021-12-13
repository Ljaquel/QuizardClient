import { useQuery } from '@apollo/client';
import React from 'react'
import { Link } from 'react-router-dom';

import { FETCH_USER_QUERY } from "../Calls";

const ProfileBannerFollow = ({userId,history}) => {
  const destination =  "/profile/"

  const  { data:userData }  = useQuery(FETCH_USER_QUERY, {  
    variables: { userId: userId } 
  });
  const currentuser = userData?.getUser 

  return (
    // <div className="row profile-banner-followers" onClick={() => { history.push(userId) }} >
       <Link to={`${userId}`} target="_top" className="row profile-banner-followers text-muted" >
      <div className="col-5">
        <p>{currentuser?.name} </p>
       </div>
      
       <div className="col-5">
        <p>{currentuser?.username} </p>
       </div> 
      </Link>  
  )
}

export default ProfileBannerFollow
