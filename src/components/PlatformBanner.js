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
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    onCompleted() { refetch() }
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
    updateUser({ variables: { userId: visitor?._id, update: { following: newFollowing } }})
    updatePlatform({ variables: { platformId: platform?._id, update: { followers: newFollowers }}})
    setFollowing(!following)
  }

  const isOwner = platform?.creator._id === contextUserId

  if(!platform) return <PageNotFound/>
  if(!visitor) return <Loading/>

  return(
    <div className="mb-3">
      <div className="row px-3 mx-0" style={{backgroundImage: 'url('+platform?.banner.url+')', backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: platform ? platform.bannerColor : "#ffffff"}}>
        <div className="col col-auto rounded p-1 bg-light" style={{marginTop: "70px", marginBottom: "16px"}}>
          <div onClick={() => history.push('/profile/'+platform?.creator._id)} className="pointer" style={{ width:"250px", height:"250px", backgroundPosition:"center", backgroundSize: 'cover', backgroundImage: platform?.image?.url?"url("+platform.image.url+")":"url(https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png)" }}/>
        </div>
        <div className="col"></div>
        <div className="col col-auto pe-0 pt-1">
          {isOwner && <EditPlatformPopUp refetch={refetch} platform={platform}/>}
        </div>
        <div className="row p-0 m-0 pb-2">
          <div className="col-auto p-0">
            <span className="badge bg-light text-dark pointer" onClick={() => history.push('/profile/'+platform?.creator._id)} style={{fontSize:"17px"}}>By {platform?.creator.name} ({platform?.creator.username})</span>
          </div>
          <div className="col"></div>
          <div className="col-auto p-0">
            <span className="badge bg-light text-dark" style={{fontSize:"17px"}}>{platform?.followers.length} follower{platform?.followers.length===1?'':'s'}</span>
          </div>
        </div>
      </div>
      <div className="container-md">
        <div className="row rounded">
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

        <div className="row rounded">
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

          <div className="col col-auto px-0 pe-1 self-align-center"> 
            {platform?.creator?._id === contextUserId && 
                <CreateQuizPopUp addQuiz={addQuiz}/> }
            {!isOwner &&
              <button className="btn btn-md border border-2 bg-light self-align-center" onClick={onFollow}> {following ? 'Follow' : 'Following'} </button> } 
          </div>

          <div className="col col-auto px-0 self-align-center">
            {platform?.creator?._id === contextUserId && 
              <DeletePlatformPopUp platform={platform} count={count} history={history}/>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default PlatformBanner