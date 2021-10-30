import React, { useContext, useEffect } from 'react'
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
  


  const { data, refetch } = useQuery(FETCH_QUIZZES_BY_CREATOR, {variables: {creatorId: userId}});

  useEffect(() => {
      refetch()
      
    }, [refetch]);

  if(!data) { return <Loading/> }
//   const quizzes =data?.getQuizzesByCreator;
  const { getQuizzesByCreator: quizzes } = data;
  

  if(user._id !== userId) { return <PageNotFound message="No Access Error"/> }

  return (
      <div className="container">
            
        <div className="row row-cols-auto g-3">
        
          {user&&quizzes && quizzes.map((quiz, index) =>
            <div className="mcol"  key={index}>
              <QuizCard quiz={quiz}/>
            </div>
          )}
        </div>
      </div>
  )
}

export default ProfileQuizArea;