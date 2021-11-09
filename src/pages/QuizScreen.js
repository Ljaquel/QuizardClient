import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';

import QuizHome from '../components/quizScreen/QuizHome'
import QuizInSession from '../components/quizScreen/QuizInSession'
import QuizResults from '../components/quizScreen/QuizResults'
import { AuthContext } from '../context/auth';
import Loading from '../components/Loading';
import PageNotFound from '../pages/PageNotFound';
import { FETCH_QUIZ_QUERY } from '../Calls'

const QuizScreen = () => {
  const { user, update:updateUserContext } = useContext(AuthContext);
  const { _id:quizId } = useParams();
  const [screen, setScreen] = useState(1)
  
  const { data } = useQuery(FETCH_QUIZ_QUERY, { variables: { quizId: quizId } });
  const quiz = data?.getQuiz
  
  if(!quiz) { return <Loading/> }
  if(user._id === quiz.creator && quiz.published === false) { return <PageNotFound message="No Access Error"/> }
  
  return (
    <>
      {
        screen === 1 ? <QuizHome quiz={quiz} user={user} setScreen={setScreen}/> :
        screen === 2 ? <QuizInSession quiz={quiz} user={user} updateUserContext={updateUserContext} setScreen={setScreen}/> :
        screen === 3 ? <QuizResults quiz={quiz} setScreen={setScreen}/> :
        <PageNotFound message="Error" />
      }
    </>
  )
}

export default QuizScreen
