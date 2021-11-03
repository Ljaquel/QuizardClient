import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';

import { AuthContext } from '../context/auth';
import Loading from '../components/Loading';
import PageNotFound from '../pages/PageNotFound';
import { FETCH_QUIZ_QUERY } from '../Calls'

const QuizScreen = () => {
  const { user } = useContext(AuthContext);
  const { _id:quizId } = useParams();
  
  const { data } = useQuery(FETCH_QUIZ_QUERY, { variables: { quizId: quizId } });
  const quiz = data?.getQuiz
  
  if(!quiz) { return <Loading/> }
  if(user._id === quiz.creator) { return <PageNotFound message="No Access Error"/> }
  return (
    <div className="container-lg pt-2">
      <div className="row mt-2 mb-5">
        <div className="col">
          <h1>QuizScreen</h1>
        </div>
        <div className="col">
        </div>
        <div className="col-2 mt-3">
          <button className="btn btn-success" disabled>Take Quiz</button>
        </div>
      </div>
      <h5>Name: {quiz.name}</h5>
      <h5>Description: {quiz.description}</h5>
      <h5>Difficulty: {quiz.difficulty}</h5>
      <h5>Total Questions: {quiz.content.length}</h5>
    </div>
  )
}

export default QuizScreen
