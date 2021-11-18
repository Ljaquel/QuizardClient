import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';

import QuizHome from '../components/quizScreen/QuizHome'
import QuizInSession from '../components/quizScreen/QuizInSession'
import QuizResults from '../components/quizScreen/QuizResults'
import { AuthContext } from '../context/auth';
import Loading from '../components/Loading';
import PageNotFound from '../pages/PageNotFound';
import { FETCH_QUIZ_QUERY, FETCH_USER_QUERY } from '../Calls'

const QuizScreen = (props) => {
  const { contextUserId } = useContext(AuthContext)
  const { _id:quizId } = useParams();
  const [screen, setScreen] = useState(1)
  
  const { data:userData } = useQuery(FETCH_USER_QUERY, { variables: { userId: contextUserId } });
  const user = userData?.getUser

  const { data } = useQuery(FETCH_QUIZ_QUERY, { variables: { quizId: quizId } });
  const quiz = data?.getQuiz
  
  if(!quiz || !user) { return <Loading/> }
  if(contextUserId === quiz.creator && quiz.published === false) { return <PageNotFound message="No Access Error"/> }
  
  return (
    screen === 1 ? <QuizHome quiz={quiz} user={user} setScreen={setScreen}/> :
    screen === 2 ? <QuizInSession quiz={quiz} user={user} setScreen={setScreen}/> :
    screen === 3 ? <QuizResults quiz={quiz} user={user} setScreen={setScreen} history={props.history}/> :
    <PageNotFound message="Error" />
  )
}

export default QuizScreen
