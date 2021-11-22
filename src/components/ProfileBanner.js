import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from '../context/auth'
import CreatePlatformPopUp from '../components/CreatePlatformPopUp'; 
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
    <div className="row rounded p-2 py-1 mb-3 mt-1" style={{backgroundColor: user.color}}>
      <div className="col col-12 mx-5 mt-3"> 
        <Image cloudName="ljaquel"  width="150" height="150" crop="fill" radius="max" publicId={user.avatar.publicId?user.avatar.publicId:"admin/profile_uvnezs"}/>      
      </div>

      <div className="col mx-5 my-3"> 
        <h1>{user?.name} - Platforms</h1>        
      </div>

      <div className="col col-auto mt-4"> 
        {user?._id === contextUserId && 
            <CreatePlatformPopUp addPlatform={addPlatform}/> }
        {!(user?._id===contextUserId) &&
          <button className="btn btn-md bg-success" onClick={followClick}> {follow ? 'Follow' : 'Unfollow'} </button> } 
      </div>
        
    </div>
  )
}

export default ProfileBanner