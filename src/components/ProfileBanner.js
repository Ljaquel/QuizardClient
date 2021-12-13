import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from '../context/auth'
import Loading from './Loading'

import { FETCH_USER_QUERY, UPDATE_USER } from "../Calls";

const breaks = [0, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200]

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

  let percentage = user?.level ? ( (user.points-breaks[user.level-1]) / (breaks[user.level]-breaks[user.level-1]) * 100 )   : '0'
  let start = user?.level ?  breaks[user.level-1]+'' : '0'
  let end = user?.level ? breaks[user.level]+''  : '100'
  
  return(
    <div className="container-fluid px-0 h-100 pt-5" style={{backgroundColor: user.color}}>
  
          <div className="row mx-0 justify-content-center pt-5">
            <div className="col col-auto my-3 rounded-circle border border-1" style={{ width:"190px", height:"190px", backgroundPosition:"center", backgroundSize: 'cover', backgroundImage: user.avatar.url ? "url("+user.avatar.url+")" : "url(https://res.cloudinary.com/ljaquel/image/upload/v1637536528/admin/profile_uvnezs.png)" }}/>
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

          <div className="row mx-0 mt-3 pb-1 justify-content-center">
            <div className="col-auto px-0 pt-4"> 
              <span className="badge bg-light text-dark" style={{fontSize: '20px'}}>Level {user?.level}</span>
            </div>
          </div>
          <div className="row mx-0 justify-content-center">
            <div className="col-auto px-0"> 
              <span className="badge bg-light text-dark" style={{fontSize: '20px'}}>{user?.points} Points</span>
            </div>
          </div>


          <div className="row mx-0 justify-content-center px-1">
            <div className="col-12 pt-2"> 
              <div className="progress" style={{height: '10px'}}>
                <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: percentage+'%' }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div className="col-auto">
              <span className="badge bg-light text-success p-1">{start}</span>
            </div>
            <div className="col"></div>
            <div className="col-auto">
              <span className="badge bg-light text-success p-1">{end}</span>
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