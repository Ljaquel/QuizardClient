import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import PageNotFound from '../pages/PageNotFound'
import { AuthContext } from '../context/auth'
import DeletePlatformPopUp from '../components/DeletePlatformPopUp';
import CreateQuizPopUp from '../components/CreateQuizPopUp';
import { Image } from 'cloudinary-react'
import EditPlatformPopUp from '../components/EditPlatformPopUp'
import { UPDATE_PLATFORM } from "../Calls";

const PlatformBanner = ({platform, addQuiz, count, history, refetch, sitePlatformId}) => {
  const { contextUserId } = useContext(AuthContext);
  const [follow, setFollow] = useState(false)
  const [nameState, setNameState] = useState(platform?.name)

  const [ updatePlatform ] = useMutation(UPDATE_PLATFORM, {
    variables: { platformId: sitePlatformId },
    onError(err) { console.log(JSON.stringify(err, null, 2)) }
  })

  const onFollow = () => {
    setFollow(!follow)
  }

  const isOwner = platform?.creator._id === contextUserId

  if(!platform) { return <PageNotFound/> }
  return(
    <div className="row rounded p-2 py-1 mb-3 mt-1" style={{backgroundColor: "#ffffff"}}>
      <div className="row bg-primary rounded ps-4" style={{backgroundImage: 'url('+platform?.banner.url+')', backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <div className="col col-auto rounded p-1 bg-light my-5">
          <Image cloudName="ljaquel"  width="150" height="150" crop="fill" publicId={platform.image.publicId?platform.image.publicId:"admin/profile_uvnezs"}/>      
        </div>
        <div className="col"></div>
        <div className="col col-auto pe-0">
          {isOwner && <EditPlatformPopUp refetch={refetch} platform={platform}/>}
        </div>
      </div>

      <div className="col col-5 my-3">
        <textarea 
          className="form-control px-1 mb-1 border-0"
          style={{ height: "1px", fontSize:"22px", resize:'none', maxWidht: '100px'}}
          placeholder="Platform Name"
          value={nameState}
          onChange={(e) => setNameState(e.target.value)}
          onBlur={() => updatePlatform({variables: {update: {name: nameState}}})}
        />      
      </div>

      <div className="col">

      </div>

      <div className="col col-auto mt-4"> 
        {platform?.creator?._id === contextUserId && 
            <CreateQuizPopUp addQuiz={addQuiz}/> }
        {!(platform?.creator?._id===contextUserId) &&
          <button className="btn btn-md bg-success" onClick={() => onFollow()}> {follow ? 'Follow' : 'Following'} </button> } 
      </div>

      <div className="col col-auto mt-4">
        {platform?.creator?._id === contextUserId && 
          <DeletePlatformPopUp platform={platform} count={count} history={history}/>
        }
      </div>

    </div>
  )
}

export default PlatformBanner