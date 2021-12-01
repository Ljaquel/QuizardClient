import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from '../context/auth'
import Loading from './Loading'

import { FETCH_USER_QUERY, UPDATE_USER } from "../Calls";

const ProfileBanner = ({ user }) => {
  const { contextUserId } = useContext(AuthContext);
  const [following, setFollowing] = useState()

  const  { data:visitorData }  = useQuery(FETCH_USER_QUERY, {
    onCompleted() { setFollowing(!visitor?.following?.includes(user._id)) }, 
    variables: { userId: contextUserId } 
  });
  const visitor = visitorData?.getUser

  const [ updateUser ] = useMutation(UPDATE_USER, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { userId: contextUserId }
  })

  const onFollow=() => {   
    let newFollowing = [ ...visitor.following ]
    var newFollowers = [ ...user.followers ]
    if (following) {
     newFollowing.push(user._id) 
     newFollowers.push(visitor._id)
    }
    else{  
       newFollowing = newFollowing.filter(el => el !== user._id)
       newFollowers = newFollowers.filter(el => el !== visitor._id)
    }
    updateUser({ variables: { userId: user?._id, update: { followers: newFollowers }}})
    updateUser({ variables: { userId: visitor?._id, update: { following: newFollowing } }})
    setFollowing(!following)
  }

  if(!user || !visitor) return <Loading/>
  
  return(
    <div className="container-fluid px-0 h-100 pt-5" style={{backgroundColor: user.color}}>
  
          <div className="row mx-0 justify-content-center pt-5">
            <div className="col col-auto mt-3 rounded" style={{ width:"170px", height:"170px", backgroundPosition:"center", backgroundSize: 'cover', backgroundImage: user.avatar.url ? "url("+user.avatar.url+")" : "url(https://res.cloudinary.com/ljaquel/image/upload/v1637536528/admin/profile_uvnezs.png)" }}/>
          </div>

          <div className="row mx-0 justify-content-center">
            <div className="col col-auto"> 
              <span style={{fontSize: '28px'}}>{user?.name}</span>
            </div>
          </div>

          <div className="row mx-0 justify-content-center">
            <div className="col col-auto"> 
              <span style={{fontSize: '20px'}}>{user?.username}</span>
            </div>
          </div>

          <div className="row mx-0 mt-3 justify-content-center">
            <div className="col col-auto px-0 pe-2"> 
              <span className="badge bg-dark" style={{fontSize: '20px'}}>{user?.points} Points</span>
            </div>
            <div className="col col-auto px-0"> 
              <span className="badge bg-dark" style={{fontSize: '20px'}}>Level {user?.level}</span>
            </div>
          </div>

          <div className="row mx-0 justify-content-end">
            <div className="col col-auto"> 
              {!(user?._id===contextUserId) &&
                <button className="btn btn-md bg-light border border-1 p-0 px-2" onClick={onFollow}> {following ? 'Follow' : 'Following'} </button> } 
            </div>
          </div>
        
    </div>
  )
}

export default ProfileBanner