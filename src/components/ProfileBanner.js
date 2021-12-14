import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from '../context/auth'
import Loading from './Loading'

import { FETCH_USER_QUERY, UPDATE_USER } from "../Calls";
import { Modal, Button } from "react-bootstrap";
import ProfileBannerFollow from "./ProfileBannerFollow";


const breaks = [0, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200]

const ProfileBanner = ({ user, history }) => {
  const { contextUserId } = useContext(AuthContext);
  const [following, setFollowing] = useState()
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
 
 
  const  { data:userData,refetch }  = useQuery(FETCH_USER_QUERY, { variables: { userId: user?._id }   });
  const userMain = userData?.getUser 

  const  { data:visitorData }  = useQuery(FETCH_USER_QUERY, {
    onCompleted() { setFollowing(!visitor?.following?.includes(user?._id)) }, 
    variables: { userId: contextUserId } 
  });
  const visitor = visitorData?.getUser  

  const [ updateUser ] = useMutation(UPDATE_USER, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { userId: contextUserId }
  })

  useEffect(() => {
    refetch()
  }, [refetch]);

  const onFollow=() => { 
    var newFollowing = [ ...visitor?.following ]
    var newFollowers = [ ...userMain?.followers ]   

    if (following) {
     newFollowing.push(user._id)  
     newFollowers.push(visitor._id)  
    }
    else{   
       newFollowing = newFollowing.filter(el => el !== user._id) 
       newFollowers = newFollowers.filter(el => el !== visitor._id)
    }
    updateUser({ variables: { userId: userMain?._id, update: { followers: newFollowers }}})
    updateUser({ variables: { userId: visitor?._id, update: { following: newFollowing } }})
    refetch() 
    setFollowing(!following)
  }

  
  const handleCloseFollowers = () => {setShowFollowers(false)};
  const handleShowFollowers = () => setShowFollowers(true);refetch(); 
  const handleCloseFollowing = () => {setShowFollowing(false);refetch() };
  const handleShowFollowing = () => setShowFollowing(true); 

  if(!user || !visitor) return <Loading/>

  let percentage = user?.level ? ( (user.points-breaks[user.level-1]) / (breaks[user.level]-breaks[user.level-1]) * 100 )   : '0'
  let start = user?.level ?  breaks[user.level-1]+'' : '0'
  let end = user?.level ? breaks[user.level]+''  : '100'
  
  return(
    <div className="container-fluid px-0 h-100 pt-3" style={{backgroundColor: user.color}}>
          <div className="row mx-0 justify-content-end">
            {/* <div className="col col-auto"> 
              {!(user?._id===contextUserId) &&
                <button className= {following? "btn btn-secondary btn-sm": "btn btn-success btn-sm"}   onClick={onFollow} > {following ? 'Follow' : 'Following'} </button> } 
            </div> */}
          </div>
          <div className="row justify-content-center"  >
            <div className="ms-auto me-auto d  col-auto my-3 rounded-circle border border-1" style={{ width: "150px", height:"150px", backgroundPosition:"center", backgroundSize: 'cover', 
              backgroundImage: user.avatar.url ? "url("+user.avatar.url+")" : "url(https://res.cloudinary.com/ljaquel/image/upload/v1637536528/admin/profile_uvnezs.png)" }} />
          </div>
          <div className="row mx-0 justify-content-center">
            <div className="col col-auto"> 
              <span style={{fontSize: '28px'}}>{user?.name}</span>
            </div>
          </div>

          <div className="row mx-0 justify-content-center">
            <div className="col col-auto"> 
              <span style={{fontSize: '20px'}}>@{user?.username}</span>
            </div>
          </div>
                 
          <div className="row mx-0 justify-content-center pt-1 pb-1">
            <div className="col col-auto">
             
               
              {!(user?._id===contextUserId) &&
                <button className={`btn btn-lg btn${following?'-outline':''}-dark p-0 px-2`} onClick={onFollow}> {following ? 'Follow' : 'Following'} </button> } 
            </div>
          </div>

          <div className="row mx-0 mt-3 pb-1 justify-content-center">
            <div className="col-auto px-0 pt-4"> 
              <span className="badge bg-dark" style={{fontSize: '17px'}}>Level {user?.level}</span>
            </div>
          </div>
          <div className="row mx-0 justify-content-center">
            <div className="col-auto px-0"> 
              <span className="badge bg-dark" style={{fontSize: '16px'}}>{user?.points} Points</span>
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
          <div className="row mx-0 mt-3 pb-1 justify-content-center">
            <div className="col-auto px-0 pt-4"> 
            <Button variant="success" className=" btn text-light  " style={{}} onClick={handleShowFollowers}> Followers {[ ...userMain?.followers ].length} </Button>
            </div>
          </div>
          <div className="row mx-0 justify-content-center">
            <div className="col-auto px-0"> 
            <Button variant="success" className=" btn text-light  " style={{}} onClick={handleShowFollowing}> Following {[ ...userMain?.following ].length}</Button>
            </div>
          </div>

          <Modal show={showFollowers} onHide={handleCloseFollowers}>
            <Modal.Header closeButton> <Modal.Title>Followers</Modal.Title> </Modal.Header>
            <Modal.Body>
              <div style={{ maxWidth: "800px" }}> 
                <div className="row">
                <div className="col-4"> <p>Avatar </p> </div> 
                  <div className="col-4"> <p>Name </p> </div> 
                  <div className="col-4"> <p>Username </p> </div>
                </div> 
                { [ ...userMain?.followers ] && [ ...userMain?.followers ].map((userId, index) => <ProfileBannerFollow history={history} userId={userId} /> )} 
              </div>   
            </Modal.Body>
            <Modal.Footer> <Button variant="secondary" onClick={handleCloseFollowers}> Close  </Button> </Modal.Footer>
          </Modal>     

          <Modal show={showFollowing} onHide={handleCloseFollowing}>
            <Modal.Header closeButton> <Modal.Title>Following</Modal.Title> </Modal.Header>
            <Modal.Body>
              <div style={{ maxWidth: "800px" }}> 
                <div className="row">
                <div className="col-4"> <p>Avatar </p> </div> 
                  <div className="col-4"> <p>Name </p> </div> 
                  <div className="col-4"> <p>Username </p> </div>
                </div> 
                { [ ...userMain?.following ] && [ ...userMain?.following ].map((userId, index) => <ProfileBannerFollow history={history} userId={userId} /> )} 
              </div>   
            </Modal.Body>
            <Modal.Footer> <Button variant="secondary" onClick={handleCloseFollowing}> Close  </Button> </Modal.Footer>
          </Modal>  
    </div>
  )
}

export default ProfileBanner