import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import PageNotFound from '../pages/PageNotFound'
import { AuthContext } from '../context/auth'
import DeletePlatformPopUp from '../components/DeletePlatformPopUp';
import CreateQuizPopUp from '../components/CreateQuizPopUp';
import Loading from './Loading'
import EditPlatformPopUp from '../components/EditPlatformPopUp'
import { UPDATE_PLATFORM, UPDATE_USER, FETCH_USER_QUERY } from "../Calls";

const PlatformBanner = ({platform, addQuiz, count, history, refetch, sitePlatformId}) => {
  const { contextUserId } = useContext(AuthContext);
  const [following, setFollowing] = useState()
  const [nameState, setNameState] = useState(platform?.name)
  const [descriptionState, setDescriptionState] = useState(platform?.description)

  const  { data:visitorData }  = useQuery(FETCH_USER_QUERY, {
    onCompleted() { setFollowing(!visitor?.following?.includes(platform._id)) }, 
    variables: { userId: contextUserId } 
  })
  const visitor = visitorData?.getUser

  const [ updatePlatform ] = useMutation(UPDATE_PLATFORM, {
    variables: { platformId: sitePlatformId },
    onError(err) { console.log(JSON.stringify(err, null, 2)) }
  })

  const [ updateUser ] = useMutation(UPDATE_USER, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { userId: contextUserId }
  })

  const onFollow=() => {   
    let newFollowing = [ ...visitor.following ]
    var newFollowers = [ ...platform.followers ]
    if (following) {
     newFollowing.push(platform._id) 
     newFollowers.push(visitor._id)
    }
    else{  
       newFollowing = newFollowing.filter(el => el !== platform._id)
       newFollowers = newFollowers.filter(el => el !== visitor._id)
    }
    updatePlatform({ variables: { platformId: platform?._id, update: { followers: newFollowers }}})
    updateUser({ variables: { userId: visitor?._id, update: { following: newFollowing } }})
    setFollowing(!following)
  }

  const isOwner = platform?.creator._id === contextUserId

  if(!platform) return <PageNotFound/>
  if(!visitor) return <Loading/>

  return(
    <div className="rounded py-1 mb-3 mt-1">
      <div className="row rounded px-3 mx-0" style={{backgroundImage: 'url('+platform?.banner.url+')', backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: platform ? platform.bannerColor : "#ffffff"}}>
        <div className="col col-auto rounded p-1 bg-light" style={{marginTop: "95px", marginBottom: "16px"}}>
          <div style={{ width:"150px", height:"150px", backgroundPosition:"center", backgroundSize: 'cover', backgroundImage: platform?.image?.url?"url("+platform.image.url+")":"url(https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png)" }}/>
        </div>
        <div className="col"></div>
        <div className="col col-auto pe-0">
          {isOwner && <EditPlatformPopUp refetch={refetch} platform={platform}/>}
        </div>
      </div>

      <div className="row rounded px-2">
        <div className="col col-5 mt-1">
          {isOwner ?
            <textarea 
              className="form-control px-1 border-0"
              style={{ backgroundColor: 'inherit', height: "1px", fontSize:"22px", resize:'none', maxWidht: '100px'}}
              placeholder="Platform Name"
              spellCheck="false"
              value={nameState}
              onChange={(e) => setNameState(e.target.value)}
              readOnly={!isOwner}
              onBlur={() => updatePlatform({variables: {update: {name: nameState}}})}
            />
          :
          <h5 className='display-6'>{nameState}</h5>
          }      
        </div>
      </div>

      <div className="row rounded px-2">
        <div className="col col-8 mb-1">
          {isOwner ?
            <textarea 
              className="form-control px-1 mb-1 border-0"
              style={{ backgroundColor: 'inherit', height: "80px", fontSize:"12px", resize:'none', maxWidht: '100px'}}
              placeholder="Platform Description"
              value={descriptionState}
              spellCheck="false"
              onChange={(e) => { let str = e.target.value ;if(str?.length > 400) str = str.substring(0, 401); setDescriptionState(str)}}
              readOnly={!isOwner}
              onBlur={() => updatePlatform({variables: {update: {description: descriptionState}}})}
            />
          :
          <h5 className='display-6' style={{ fontSize:"12px" }}>{descriptionState}</h5>
          }      
        </div>

        <div className="col"></div>

        <div className="col col-auto mt-4"> 
          {platform?.creator?._id === contextUserId && 
              <CreateQuizPopUp addQuiz={addQuiz}/> }
          {!isOwner &&
            <button className="btn btn-md border border-2 bg-light" onClick={onFollow}> {following ? 'Follow' : 'Following'} </button> } 
        </div>

        <div className="col col-auto mt-4">
          {platform?.creator?._id === contextUserId && 
            <DeletePlatformPopUp platform={platform} count={count} history={history}/>
          }
        </div>

      </div>

    </div>
  )
}

export default PlatformBanner