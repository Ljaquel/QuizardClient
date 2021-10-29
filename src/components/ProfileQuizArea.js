import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import QuizCard from './QuizCard'
import Loading from './Loading'
import PageNotFound from '../pages/PageNotFound'
import { AuthContext } from '../context/auth'
import { FETCH_QUIZZES_BY_CREATOR } from '../Calls'


const ProfileQuizArea = () => {
  const { user } = useContext(AuthContext);
  const { _id:userId } = useParams()
  
  const { data, loading } = useQuery(FETCH_QUIZZES_BY_CREATOR, {variables: {creatorId: userId}});

  const quizzes =data?.getQuizzesByCreator;

  if(loading) { return <Loading/> }
  if(user._id !== userId) { return <PageNotFound message="No Access Error"/> }

  return (
      <div className="container">
        <div className="row row-cols-auto g-3">
          {quizzes && quizzes.map((quiz, index) =>
            <div className="mcol"  key={index}>
              <QuizCard quiz={quiz}/>
            </div>
          )}
        </div>
      </div>
  )
}

export default ProfileQuizArea;