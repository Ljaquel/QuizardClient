import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from '../context/auth'
import { Image } from 'cloudinary-react'

import { FETCH_USER_QUERY, UPDATE_USER_MUTATION,SET_FOLLOWER } from "../Calls";

const ProfileBanner = ({user, addPlatform}) => {
  const { contextUserId } = useContext(AuthContext);
  const [follow, setfollow] = useState()

  const [ updateUserFollowing ] = useMutation(UPDATE_USER_MUTATION, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) }, variables: {}
  });
  const  { data: followerUserData}  = useQuery(FETCH_USER_QUERY, {
    onCompleted() {
      setfollow(!follower?.following?.includes(user._id))
    }, 
     variables: { userId: contextUserId } 
  });
  const follower = followerUserData?.getUser

  const [ setFollower ] = useMutation(SET_FOLLOWER, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) }, 
    variables: {}
  });


  var newfollowing = follower ? [...follower.following] : [] 
  var newfollowers = user ? [...user.followers] : []
 

  const followClick=() =>{   

    if (follow) {
     newfollowing.push(user._id) 
     newfollowers.push(follower._id)
    }
    else{  
       newfollowing=newfollowing.filter(el => el !== user._id) 
       newfollowers=newfollowers.filter(el => el !== follower._id) 
    }
    const following = { following: newfollowing } 
    setFollower({variables: {creatorId: user?._id , newFollowers: newfollowers}})
    updateUserFollowing({ variables: { fields: following }})
    setfollow(!follow)
  }
  if(!user) { return <div className="col-auto mx-5 my-3">  Not working </div> }
  
  return(
    <div className="px-4 rounded p-2 py-1 mb-1 mt-1 border border-2" style={{backgroundColor: user.color}}>
      <div className="row justify-content-center">
        <div className="col col-auto mt-3"> 
          <Image cloudName="ljaquel"  width="170" height="170" crop="thumb" radius="5" publicId={user.avatar.publicId?user.avatar.publicId:"admin/profile_uvnezs"}/>      
        </div>
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
            <button className="btn btn-md bg-light border border-1 p-0 px-2" onClick={followClick}> {follow ? 'Follow' : 'Following'} </button> } 
        </div>
      </div>
        
    </div>
  )
}

export default ProfileBanner