import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from '../context/auth'
import CreateQuizPopUp from '../components/CreateQuizPopUp'; 
import { Image } from 'cloudinary-react'

import { FETCH_USER_QUERY, UPDATE_USER_MUTATION,SET_FOLLOWER } from "../Calls";
import context from "react-bootstrap/esm/AccordionContext";

const ProfileBanner = (props) => {
  const { userContext } = useContext(AuthContext);
  const user=props.user
  const [ updateUserFollowing ] = useMutation(UPDATE_USER_MUTATION, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) }, variables: {}
  });
  const  { data: followerUserData}  = useQuery(FETCH_USER_QUERY, {
    onCompleted() {
      setfollow(!follower?.following?.includes(user.username.concat(" "+user._id)))
    }, 
    variables: { userId: userContext._id } });
  const follower = followerUserData?.getUser

  const [ setFollower ] = useMutation(SET_FOLLOWER, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) }, 
    variables: {}
  });

  const [follow, setfollow] = useState()

  const followClick=() =>{  
    let newfollowing=[...follower.following] 
    let newfollowers=[...user.followers]
    let followingstr=user.username.concat(" "+user._id)
    let followerstr=follower.username.concat(" "+follower._id)
    if (follow) {
     newfollowing.push(followingstr) 
     newfollowers.push(followerstr)
    }
    else{  
       newfollowing=newfollowing.filter(el => el !== followingstr) 
       newfollowers=newfollowers.filter(el => el !== newfollowers) 
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
        {user?.username === userContext?.username && 
            <CreateQuizPopUp addQuiz={props.addQuiz}/> }
        {!(user?.username===userContext?.username) &&
          <button onClick={followClick}> {follow ? 'follow' : 'unfollow'} </button> } 
      </div>
        
    </div>
  )
}

export default ProfileBanner