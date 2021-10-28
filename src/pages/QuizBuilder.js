import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';
import Workspace from '../components/Workspace';
import BuilderSideBar from '../components/BuilderSideBar';
import Description from '../components/Description';
import Loading from '../components/Loading';
import PageNotFound from '../pages/PageNotFound';

const QuizBuilder = () => {
  const { user } = useContext(AuthContext);
  const { _id:quizId } = useParams();
  const [quizState, setQuizState] = useState({});
  
  const { data, loading } = useQuery(FETCH_QUIZ_QUERY, { variables: { quizId: quizId } });
  
  const quiz = data?.getQuiz

  useEffect(() => {
    setQuizState(quiz)
  }, [quiz]);

  if(loading) { return <Loading/> }

  if(user._id !== quiz.creator) { return <PageNotFound message="No Access Error"/> }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-success">
          <BuilderSideBar/>
        </div>
        <div className="col-9">
          <div className="row">
            <div className="col bg-dark">
              <Workspace/>
            </div>
          </div>
          <div className="row">
            <div className="col bg-danger">
              <Description description={quizState?.description}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FETCH_QUIZ_QUERY = gql`
  query($quizId: ID!) {
    getQuiz(quizId: $quizId) {
      _id
      name
      description
      creator
      createdAt
    }
  }
`;

export default QuizBuilder;