import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import { useParams, Redirect } from 'react-router-dom'
import { gql, useQuery, useMutation } from '@apollo/client';
import Workspace from '../components/Workspace';
import BuilderSideBar from '../components/BuilderSideBar';
import Description from '../components/Description';
import Loading from '../components/Loading';
import PageNotFound from '../pages/PageNotFound';

const QuizBuilder = (props) => {
  const { user } = useContext(AuthContext);
  const { _id:quizId } = useParams();
  const [quizState, setQuizState] = useState({});
  
  const { data, loading } = useQuery(FETCH_QUIZ_QUERY, { variables: { quizId: quizId } });

  const quiz = data?.getQuiz

  useEffect(() => {
    setQuizState(quiz)
  }, [quiz]);

  
  const [deleteQ] = useMutation(DELETE_QUIZ_MUTATION, {
    update( _, data) {
      props.history.push("/");
    },
    onError(err) {
      console.log(err)
    },
    variables: {quizId: quizId}
  });

  const deleteQuiz = () => {
    deleteQ();
  }

  if(loading) { return <Loading/> }

  if(user._id !== quiz.creator) { return <PageNotFound message="No Access Error"/> }

  return (
    <div className="container-fluid">
      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteQuiz()}>x</button>
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

const DELETE_QUIZ_MUTATION = gql`
  mutation($quizId: ID!) {
    deleteQuiz(quizId: $quizId)
  }
`;

export default QuizBuilder;