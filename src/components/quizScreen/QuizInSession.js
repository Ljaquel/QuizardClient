import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/auth'
import Question from './playground/Question'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_USER_MUTATION, CREATE_RESULT, FETCH_RESULTS_QUERY, UPDATE_RESULT } from '../../Calls'
import QuizInSessionNav from './playground/QuizInSessionNav'

const QuizInSession = ({ quiz, updateUserContext, setScreen}) => {
  const { user } = useContext(AuthContext)
  const [record, setRecord] = useState([])
  const [timer] = useState(quiz?.time)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState(null)

  const { content, style } = quiz
  const count = content.length

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyPress);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyPress);
    }
  })

  const [ updateUser ] = useMutation(UPDATE_USER_MUTATION, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: {}
  });

  const [ createResult ] = useMutation(CREATE_RESULT, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { input: {} }
  });

  const [ updateResult ] = useMutation(UPDATE_RESULT, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { }
  });

  const { data, refetch } = useQuery(FETCH_RESULTS_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { filters: { quizId: quiz._id, userId: user._id } }
  });

  useEffect(() => {
    refetch()
  }, [refetch]);

  const result = data?.getResults[0]

  const handleDocumentKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      goNextQ();
    }
  };

  const goNextQ = () => {
    let newRecord = [...record]
    newRecord.push({ answer:answer, correct:answer===content[currentQuestion].answer })
    setRecord(newRecord)
    setAnswer(null)
    if(currentQuestion === count-1) {
      finishQuiz(newRecord)
    }
    else {
      setCurrentQuestion(currentQuestion+1)
    }
  }

  const updateU = (updates) => {
    updateUser({ variables: { fields: updates }})
    updateUserContext(updates)
  }

  const finishQuiz = async (rec) => {
    let score = getScore(rec)

    if(result === null || result === undefined ) {
      let newResult = {
        userId: user._id,
        quizId: quiz._id,
        score: score,
        time: "1:02",
        badges: [],
        record: rec.map((x) => x.answer),
      }
      createResult({ variables: { input: {...newResult} }})
    }
    else {
      if(result.score < score) {
        updateResult({ variables: { resultId: result._id, update: { score: score, time: "1:00", record: rec.map((x) => x.answer) } }})
      }
    }

    if(!(result !== undefined && result.score > score)) {
      let points = result !== undefined ? (user.points+(score-result.score)) : (user.points + score)
      updateU( { points: points } )
    }
    setScreen(3)
  }

  const canGoNext = answer !== null && currentQuestion >= 0 && currentQuestion < count

  const progressPercentage = Math.floor(currentQuestion/count*100) + "%"

  const getScore = (rec) => {
    let correct = 0
    for(let i = 0; i < count; i++) { if(rec[i].correct) correct = correct+1 }
    return Math.floor(correct/count*100)
  }

  return (
    <div className="container-fluid p-0 m-0">
      <QuizInSessionNav count={count} currentQuestion={currentQuestion} timer={timer} answer={answer} setScreen={setScreen}/>
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: progressPercentage}}
        aria-valuenow="25" aria-valuemin="0" aria-valuemax={"100"}> {progressPercentage} </div>
      </div>
      <div className="container-fluid text-white workspace-container p-5" style={{backgroundColor: style?style.backgroundColor:"#abafbb"}}>
        <div className="row pb-4">
          <div className="col p-0 m-0">
            <div className="container-fluid text-white">
              {(currentQuestion >= 0) && (currentQuestion < count) && <Question question={content[currentQuestion]} style={style} answer={answer} setAnswer={setAnswer} /> }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col p-0 m-0 align-self-center">
            <button className="btn btn-sm btn-primary" disabled={!canGoNext} onClick={() => goNextQ() }>{currentQuestion === count-1 ? "Finish" : "Next Question"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizInSession