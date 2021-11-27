import React, { useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import ProfileBanner from '../components/ProfileBanner'
import PlatformCard from '../components/PlatformCard'
import Loading from '../components/Loading'
import PageNotFound from '../pages/PageNotFound'
import { CREATE_PLATFORM, FETCH_PLATFORMS, FETCH_USER_QUERY } from '../Calls'
import { useParams } from 'react-router'
import CreatePlatformPopUp from '../components/CreatePlatformPopUp'; 
import { AuthContext } from '../context/auth'

const Profile = (props) => {
  const { contextUserId } = useContext(AuthContext);
  const { _id:siteUserId } = useParams();
  const  { data:userData}  = useQuery(FETCH_USER_QUERY, { variables: { userId: siteUserId } });
  const user = userData?.getUser

  const { data, loading, refetch } = useQuery(FETCH_PLATFORMS, { 
    onError(err) {
      console.log(JSON.stringify(err, null, 2)) 
    },
    variables: { filters: { creator: user?._id } } });

  useEffect(() => {
    refetch()
  }, [refetch]);

  const [addPlatform] = useMutation(CREATE_PLATFORM, {
    variables: { name: "Default Platform Name", creatorId: contextUserId },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    onCompleted() { refetch() }
  });

  const platforms = data?.getPlatforms;

  if(loading) { return <Loading/> }
  if(!user) { return <PageNotFound message="No Access Error"/> }
 
  return (
    <div className="container">  
      <ProfileBanner user={user} addPlatform={addPlatform}/>
      <div className="container">


        <div className="row pb-2">
          <div className="col px-0"> 
            {platforms && platforms.length > 0 &&<h6 className="display-6">Platforms:</h6>}
          </div>
          <div className="col col-auto px-0 align-self-center"> 
            {user?._id === contextUserId && <CreatePlatformPopUp addPlatform={addPlatform}/> }
          </div>
        </div>


        <div className="row row-cols-auto g-2 pb-3"> 
          {platforms && platforms.map((platform, index) =>
            <div className="col"  key={index}>           
              <PlatformCard platform={platform} history={props.history}/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile;