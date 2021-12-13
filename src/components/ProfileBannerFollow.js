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
         <div className="col-4">
         
            <div className=" my-3 rounded-circle border border-1" style={{ width: "25px", height:"25px", backgroundSize: 'cover',backgroundPosition:"center", 
              backgroundImage: currentuser?.avatar?.url ? "url("+currentuser.avatar.url+")" : "url(https://res.cloudinary.com/ljaquel/image/upload/v1637536528/admin/profile_uvnezs.png)" }} />
          
        </div>
          
      <div className="col-4 d-flex">
        <p className="mt-auto mb-auto">{currentuser?.name} </p>
      </div>


      <div className="col-4 d-flex">
        <p className="mt-auto mb-auto">{currentuser?.username}  </p>
      </div>
       
      </Link>  
  )
}

export default ProfileBannerFollow
