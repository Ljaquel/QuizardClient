import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from '../context/auth'
import CreateQuizPopUp from '../components/CreateQuizPopUp'; 
import { Image } from 'cloudinary-react'

import { FETCH_USER_QUERY, UPDATE_USER_MUTATION,SET_FOLLOWER } from "../Calls";


const ProfileBanner = ({user, addQuiz}) => {
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
    <div className="row">
      <div className="col col-12 mx-5 mt-3"> 
        <Image cloudName="ljaquel"  width="150" height="150" crop="fill" radius="max" publicId={user.avatar}/>      
      </div>

      <div className="col-auto mx-5 my-3"> 
        <h1>{user?.name} - Created Quizzes</h1>        
      </div>

     

      <div className="col"> 
      </div>

      <div className="col-2 mt-4"> 
        {user?._id === contextUserId && 
            <CreateQuizPopUp addQuiz={addQuiz}/> }
        {!(user?._id===contextUserId) &&
          <button onClick={followClick}> {follow ? 'follow' : 'unfollow'} </button> } 
      </div>
        
    </div>
  )
}

export default ProfileBanner