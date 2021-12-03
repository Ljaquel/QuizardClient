import React, { useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import PlatformBanner from '../components/PlatformBanner'
import QuizCard from '../components/QuizCard'
import Loading from '../components/Loading'
import { FETCH_PLATFORM, CREATE_QUIZ, FETCH_QUIZZES_QUERY } from '../Calls'
import { useParams } from 'react-router'
import { AuthContext } from '../context/auth'

const Platform = (props) => {
  const { contextUserId } = useContext(AuthContext)
  const { _id:sitePlatformId } = useParams()
  const  { data:platformData, refetch:refetchPlatform, loading:loadingPlatform}  = useQuery(FETCH_PLATFORM, { variables: { platformId: sitePlatformId } });
  const platform = platformData?.getPlatform

  //   const filters = contextUserId === siteUserId ? { creator: siteUserId } : { creator: siteUserId, published: true }
  const filters = { platform: sitePlatformId }
  const { data, loading, refetch } = useQuery(FETCH_QUIZZES_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { filters: filters } 
  });

  useEffect(() => {
    refetch()
  }, [refetch]);

  const [addQuiz] = useMutation(CREATE_QUIZ, {
    variables: { name: "Default Quiz Name", creatorId: contextUserId, platformId: sitePlatformId },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    onCompleted() { refetch() }
  });

  const quizzes = data?.getQuizzes;
  if(loading || loadingPlatform) { return <Loading/> }
  return (
    <div className="container-fluid px-0">  
      <PlatformBanner platform={platform} addQuiz={addQuiz} count={quizzes.length} history={props.history} refetch={refetchPlatform} sitePlatformId={sitePlatformId}/>
      <div className="container-md">
        
        <div className="row row-cols-auto g-3"> 
          {quizzes && quizzes.map((quiz, index) =>
            <div className="col"  key={index}>           
              <QuizCard quiz={quiz} history={props.history}/>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Platform;