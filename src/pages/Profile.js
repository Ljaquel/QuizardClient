import React, { useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import moment from 'moment'

import ProfileBanner from '../components/ProfileBanner'
import PlatformCard from '../components/PlatformCard'
import Loading from '../components/Loading'
import PageNotFound from '../pages/PageNotFound'
import { CREATE_PLATFORM, FETCH_PLATFORMS, FETCH_USER_QUERY, FETCH_RESULTS_QUERY, FETCH_QUIZZES_NAMES_LIST } from '../Calls'
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

  const { data:resultsData, refetch:refetchResult } = useQuery(FETCH_RESULTS_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2));console.log("refetchResult Error") },
    variables: { filters: { userId: siteUserId } }
  })

  const { data:namesData } = useQuery(FETCH_QUIZZES_NAMES_LIST, {
    onError(err) { console.log(JSON.stringify(err, null, 2));console.log("refetchResult Error") },
    variables: { list: (resultsData?resultsData.getResults.map(function(r) {return r.quizId}):[]) }
  })

  const results = resultsData?resultsData.getResults:[]
  let names = namesData?namesData.getQuizzesNamesList:[]
  let namesIds = []
  let namesValues = []
  for(let i=0; i<names.length;i++) {
    let arr = names[i].split(' - - - ')
    namesIds.push(arr[0])
    namesValues.push(arr[1])
  }

  useEffect(() => {
    refetch()
    refetchResult()
  }, [refetch, refetchResult]);

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
        
        <div className="col col-2 px-0">
          <ProfileBanner user={user} addPlatform={addPlatform}/>
        </div>
        
        <div className="col col-10 pt-1 px-0 overflow-auto">

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
            <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
              <div className="row row-cols-auto g-3 p-1">
                {results && names && names.length > 0 && results.map((r, i) => 
                  
                  <div className="col p-2" key={i}>
                    {namesIds.includes(r.quizId)&& names.length>0 &&
                    <div className="container-fluid border border-2 p-2 leaderboard-card pointer" onClick={() => props.history.push('/quizscreen/'+r.quizId)} style={{width: '400px'}}>
                      <div className="row p-0 m-0 justify-content-center border-bottom">
                        <div className="col-auto m-auto pb-2">{namesValues[namesIds.indexOf(r?.quizId)]}</div>
                      </div>
                      <div className="row p-0 m-0">
                        <div className="col-auto border-end">
                          <div>Best Score: {r.score}</div>
                          <div>Best Time: {r.time.substring(3, 8)} mins</div>
                          <div>{moment(r?.bestAttemptAt).fromNow()}</div>
                        </div>

                        <div className="col-auto">
                          <div>Last Score: {r.last}</div>
                          <div>Last Time: {r.lastTime.substring(3, 8)} mins</div>
                        </div>
                      </div>
                      <div className="row p-0 m-0 justify-content-center border-top pt-2">
                        <div className="col-auto m-auto pb-2">Taken {r.timesTaken} time{r.timesTaken===1?'':'s'} in total</div>
                      </div>
                    </div>
                    }
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile;