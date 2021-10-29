import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import BuilderNav from '../components/quizBuilder/BuilderNav';
import Workspace from '../components/quizBuilder/Workspace';
import BuilderSideBar from '../components/quizBuilder/BuilderSideBar';
import Description from '../components/quizBuilder/Description';
import Loading from '../components/Loading';
import PageNotFound from '../pages/PageNotFound';
import { FETCH_QUIZ_QUERY, DELETE_QUIZ_MUTATION, UPDATE_QUIZ_MUTATION } from '../Calls'

const QuizBuilder = (props) => {
  const { user } = useContext(AuthContext);
  const { _id:quizId } = useParams();
  const [quizState, setQuizState] = useState({});
  
  const { data, loading } = useQuery(FETCH_QUIZ_QUERY, { variables: { quizId: quizId } });
  const quiz = data?.getQuiz

  useEffect(() => {
    setQuizState({...quiz, __typename: undefined})
  }, [quiz]);

  
  const [ deleteQuiz ] = useMutation(DELETE_QUIZ_MUTATION, {
    onCompleted() { props.history.push("/") },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: {quizId: quizId}
  });

  const [ updateQuiz ] = useMutation(UPDATE_QUIZ_MUTATION, {
    //update(cache, { data: { updateQuiz }}){
    //  cache.writeQuery({
    //    query: FETCH_QUIZ_QUERY,
    //    data: { quiz: { ...updateQuiz, __typename: 'Quiz' } },
    //    variables: { id: updateQuiz._id }
    //  })
    //},
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { quizId: quizState?._id }
  });

  const saveQuiz = () => updateQuiz({ variables: { update: {...quizState, content: undefined} } })
  const publishQuiz = () => {
    console.log("Can't publish yet")
    //setQuizState({...quizState, published: true})
    //updateQuiz({ variables: { published: true } })
  }

  const updateField = (field, value) => setQuizState({...quizState, [field]: value})

  if(loading) { return <Loading/> }
  if(user._id !== quiz.creator) { return <PageNotFound message="No Access Error"/> }

  return (
    <>
      <BuilderNav
        name={quizState?.name}
        updateField={updateField}
        deleteQuiz={deleteQuiz}
        saveQuiz={saveQuiz}
        publishQuiz={publishQuiz}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-0">
            <BuilderSideBar/>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col p-0">
                <Workspace content={quizState?.content}/>
              </div>
            </div>
            <div className="row">
              <div className="col p-0">
                <Description description={quizState?.description} updateField={updateField}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizBuilder;