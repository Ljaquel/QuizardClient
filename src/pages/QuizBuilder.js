import React, { useContext } from 'react';
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
  const { id:quizId } = useParams();

  const { data, loading } = useQuery(FETCH_QUIZ_QUERY, { variables: { quizId: quizId } });
  if(loading) { return <Loading/> }
  const { getQuiz:quiz } = data;

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
              <Description description={quiz.description}/>
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
      id
      name
      description
      creator
      createdAt
    }
  }
`;

export default QuizBuilder;