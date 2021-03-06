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
import { RemoveTypename } from '../util/RemoveTypename'
import { FETCH_QUIZ_QUERY, DELETE_QUIZ_MUTATION, UPDATE_QUIZ_MUTATION } from '../Calls'

const QuizBuilder = (props) => {
  const { contextUserId } = useContext(AuthContext);
  const { _id:quizId } = useParams();
  const [quizState, setQuizState] = useState({});
  const [position, setPosition] = useState(0);
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [reqs, setReqs] = useState([])
  
  const { data, loading } = useQuery(FETCH_QUIZ_QUERY, { variables: { quizId: quizId } });
  const quiz = data?.getQuiz

  useEffect(() => {
    if(quiz) {
      setQuizState(RemoveTypename(quiz))
    }
  }, [quiz]);

  
  const [ deleteQuiz ] = useMutation(DELETE_QUIZ_MUTATION, {
    onCompleted() { props.history.push("/profile/"+contextUserId) },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: {quizId: quizId}
  });

  const [ updateQuiz ] = useMutation(UPDATE_QUIZ_MUTATION, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { quizId: quizState?._id }
  });

  const saveQuiz = () => {
    let update = {...quizState}
    delete update.creator
    delete update.platform
    delete update.comments
    delete update.thumbnail
    delete update.backgroundImage
    delete update.published
    updateQuiz({ variables: { update: update }})
    setUnsavedChanges(false)
  }
  const publishQuiz = () => {
    updateQuiz({ variables: { update: {published: true, publishedDate: new Date().toISOString()} } })
    props.history.push("/profile/"+contextUserId)
  }

  const updateField = (field, value) => {
    setQuizState({...quizState, [field]: value})
    if(!unsavedChanges && field !== "thumbnail" && field !== "backgroundImage") setUnsavedChanges(true)
  }

  const updateReqs = () => {
    if(!quizState) return
    let newReqs = []
    if(unsavedChanges) newReqs.push("There are unsaved changes. Save first")
    if(quizState?.content.length < 5) newReqs.push("Needs a minimum of five questions")
    if(parseInt(quizState?.time.substring(3, 5)) === 0 && parseInt(quizState?.time.substring(0, 2)) === 0) newReqs.push("Time Limit should be at least One Minute")
    if(quizState.name.length === 0) newReqs.push("Please provide a name for your quiz")
    if(quizState.description.length === 0) newReqs.push("Please provide a description for your quiz")
    setReqs(newReqs)
  }

  if(loading) { return <Loading/> }
  if(contextUserId !== quiz.creator._id) { return <PageNotFound message="No Access Error"/> }

  return (
    <>
      <BuilderNav
        name={quizState?.name}
        updateField={updateField}
        deleteQuiz={deleteQuiz}
        saveQuiz={saveQuiz}
        publishQuiz={publishQuiz}
        unsavedChanges={unsavedChanges}
        reqs={reqs}
        updateReqs={updateReqs}
        published={quizState?.published}
      />
      <div className="container-fluid flex-grow-1" >
        <div className="row h-100">
          <div className="col-3 p-0">
            <BuilderSideBar
              quiz={quizState}
              updateField={updateField}
              positionState={[position, setPosition]}
              updateQuiz={updateQuiz}
              content={quizState.content}
            />
          </div>
          <div className="col-9">
            <div className="row workspace-screen-height">
              <div className="col p-0">
                {quizState.content && <Workspace content={quizState.content} backgroundImage={quizState?.backgroundImage} updateField={updateField} positionState={[position, setPosition]} style={quizState?.style}/> }
              </div>
            </div>
            <div className="row description-screen-height">
              <div className="col-auto p-1 bg-light h-100 m-0 border-start border-2 border-secondary" >
                <div className="container-fluid h-100" style={{width: "120px", backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: quizState?.thumbnail?.url?"url("+quizState.thumbnail.url+")":"url(https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png)"}}/>
              </div>
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