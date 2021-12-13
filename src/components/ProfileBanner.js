import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from '../context/auth'
import Loading from './Loading'

import { FETCH_USER_QUERY, UPDATE_USER } from "../Calls";
import { Modal, Button } from "react-bootstrap";
import ProfileBannerFollow from "./ProfileBannerFollow";
import { useParams } from "react-router";

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
  
  return(
    <div className="container-fluid px-0 h-100 pt-3" style={{backgroundColor: user.color}}>
          <div className="row mx-0 justify-content-end">
            <div className="col col-auto"> 
              {!(user?._id===contextUserId) &&
                <button className= {following? "btn btn-secondary btn-sm": "btn btn-success btn-sm"}   onClick={onFollow} > {following ? 'Follow' : 'Following'} </button> } 
            </div>
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

          <div className="row mx-0 mt-3 justify-content-center">
            <div className="col col-auto px-0 pe-2"> 
              <span className="badge bg-dark" style={{fontSize: '20px'}}>{user?.points} Points</span>
            </div>
            <div className="col col-auto px-0"> 
              <span className="badge bg-dark" style={{fontSize: '20px'}}>Level {user?.level}</span>
            </div>
          </div>

          <div className="row mx-0 mt-3 ">
            <div className="col-6">  
              <Button variant="success" className=" btn text-light  " style={{}} onClick={handleShowFollowers}> Followers </Button>
            </div>
            <div className="col-6"> 
              <Button variant="success" className=" btn text-light  " style={{}} onClick={handleShowFollowing}> Following </Button>
            </div>
          </div>

          <Modal show={showFollowers} onHide={handleCloseFollowers}>
            <Modal.Header closeButton> <Modal.Title>Followers</Modal.Title> </Modal.Header>
            <Modal.Body>
              <div style={{ maxWidth: "800px" }}> 
                <div className="row">
                  <div className="col-5"> <p>Name </p> </div> 
                  <div className="col-5"> <p>Username </p> </div>
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
                  <div className="col-5"> <p>Name </p> </div> 
                  <div className="col-5"> <p>Username </p> </div>
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