import React, { useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'
import ProfileBanner from '../components/ProfileBanner'
import QuizCard from '../components/QuizCard'
import Loading from '../components/Loading'
import PageNotFound from './PageNotFound'
import { CREATE_QUIZ, FETCH_QUIZZES_QUERY } from '../Calls'
import { useParams } from 'react-router'

const GuestProfile = () => {
  
  const { user } = useContext(AuthContext);
  let { _id:userId } = useParams();
  debugger;
  const { data, loading, refetch } = useQuery(FETCH_QUIZZES_QUERY, { variables: { filters: { creator: userId} } });


  useEffect(() => {
    refetch()
  }, [refetch]);

   

  const quizzes = data?.getQuizzes;

  if(loading) { return <Loading/> }
  if(!user) { return <PageNotFound message="No Access Error"/> }
 
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row row-cols-auto g-3">
          {quizzes && quizzes.map((quiz, index) =>
            <div className="mcol"  key={index}>
              <QuizCard quiz={quiz}/>
            </div>
          )}
          <h1>{userId}</h1>
        </div>
      </div>
    </div>
  )
}

export default GuestProfile;