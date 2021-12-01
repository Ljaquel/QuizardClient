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
    <div className="container-fluid flex-grow-1 px-0">  
      <div className="row h-100 mx-0">
        
        <div className="col col-4 px-0">
          <ProfileBanner user={user} addPlatform={addPlatform}/>
        </div>
        
        <div className="col col-8 pt-1 px-0 overflow-auto">

          <ul className="nav nav-tabs" id="profileTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="platforms-tab" data-bs-toggle="tab" data-bs-target="#platforms" type="button" role="tab" aria-controls="platforms" aria-selected="true">Platforms</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="rewards-tab" data-bs-toggle="tab" data-bs-target="#rewards" type="button" role="tab" aria-controls="rewards" aria-selected="false">Rewards</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false">History</button>
            </li>
          </ul>
          <div className="tab-content" id="profileTabContent">
            <div className="tab-pane fade show active" id="platforms" role="tabpanel" aria-labelledby="platforms-tab">
              <div className="row row-cols-auto m-0 px-2 g-3"> 
                {platforms && platforms.map((platform, index) =>
                  <div className="col"  key={index}>           
                    <PlatformCard platform={platform} history={props.history}/>
                  </div>
                )}
                {user?._id === contextUserId &&
                  <div className="col">           
                    <CreatePlatformPopUp addPlatform={addPlatform}/>
                  </div>
                }
              </div>
            </div>
            <div className="tab-pane fade" id="rewards" role="tabpanel" aria-labelledby="rewards-tab">...</div>
            <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">...</div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile;