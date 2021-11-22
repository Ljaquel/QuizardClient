import React, { useContext, useState } from "react";
// import { useMutation, useQuery } from "@apollo/client";
import PageNotFound from '../pages/PageNotFound'
import { AuthContext } from '../context/auth'
import DeletePlatformPopUp from '../components/DeletePlatformPopUp';
import CreateQuizPopUp from '../components/CreateQuizPopUp';
import { Image } from 'cloudinary-react'
import { MdOutlineEdit } from "react-icons/md";

// import { FETCH_USER_QUERY, UPDATE_PLATFORM, SET_FOLLOWER } from "../Calls";

const PlatformBanner = ({platform, addQuiz, count, history}) => {
  const { contextUserId } = useContext(AuthContext);
  const [follow, setFollow] = useState(false)

  const onFollow = () => {
    setFollow(!follow)
  }

  const isOwner = platform?.creator._id === contextUserId

  if(!platform) { return <PageNotFound/> }
  return(
    <div className="row rounded p-2 py-1 mb-3 mt-1" style={{backgroundColor: "#ffffff"}}>
      <div className="row"> 
        <div className="col col-auto rounded ms-4 p-2" style={{position: "relative"}}>
          {isOwner && 
            <div className="floating-edit-icon rounded" style={{position: "absolute", right: '8px', top: '8px'}}>
              <MdOutlineEdit size="24"/>
            </div>
          }
          <Image cloudName="ljaquel"  width="150" height="150" crop="fill" radius="max" publicId={platform.image.publicId?platform.image.publicId:"admin/profile_uvnezs"}/>      
        </div>
      </div>

      <div className="col mx-5 my-3"> 
        <h1>{platform?.name}</h1>        
      </div>

      <div className="col col-auto mt-4"> 
        {platform?.creator?._id === contextUserId && 
            <CreateQuizPopUp addQuiz={addQuiz}/> }
        {!(platform?.creator?._id===contextUserId) &&
          <button className="btn btn-md bg-success" onClick={() => onFollow()}> {follow ? 'Follow' : 'Unfollow'} </button> } 
      </div>

      <div className="col col-auto mt-4"> 
      {platform?.creator?._id === contextUserId && 
            <DeletePlatformPopUp platform={platform} count={count} history={history}/> }
      </div>

    </div>
  )
}

export default PlatformBanner