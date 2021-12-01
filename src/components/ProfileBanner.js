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
    <div className="row justify-content-center">
      <div className="col col-5"> 
        <div className="px-4 rounded p-2 py-1 mb-1 mt-1 border border-2" style={{backgroundColor: user.color}}>
          <div className="row justify-content-center">
            <div className="col col-auto mt-3 rounded" style={{ width:"170px", height:"170px", backgroundPosition:"center", backgroundSize: 'cover', backgroundImage: user.avatar.url ? "url("+user.avatar.url+")" : "url(https://res.cloudinary.com/ljaquel/image/upload/v1637536528/admin/profile_uvnezs.png)" }}/>
          </div>

          <div className="row justify-content-center">
            <div className="col col-auto"> 
              <span style={{fontSize: '28px'}}>{user?.name}</span>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col col-auto"> 
              <span style={{fontSize: '20px'}}>{user?.username}</span>
            </div>
          </div>

          <div className="row justify-content-end">
            <div className="col col-auto"> 
              {!(user?._id===contextUserId) &&
                <button className="btn btn-md bg-light border border-1 p-0 px-2" onClick={onFollow}> {following ? 'Follow' : 'Following'} </button> } 
            </div>
          </div>
              
        </div>
      </div>
    </div>
  )
}

export default ProfileBanner