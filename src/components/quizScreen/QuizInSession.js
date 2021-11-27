import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/auth'
import Question from './playground/Question'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_USER_MUTATION, CREATE_RESULT, FETCH_RESULTS_QUERY, UPDATE_RESULT } from '../../Calls'
import QuizInSessionNav from './playground/QuizInSessionNav'

const QuizInSession = ({ user, quiz, setScreen}) => {
  const { contextUserId } = useContext(AuthContext)
  const [record, setRecord] = useState([])
  const [time] = useState(quiz?.time)
  const [timer, setTimer] = useState("00:00:00")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState(null)

  const { content, style, backgroundImage } = quiz
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
    variables: { filters: { quizId: quiz._id, userId: contextUserId } }
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
    if(currentQuestion === count-1) {
      finishQuiz(newRecord)
    }
    else {
      setAnswer(null)
      setCurrentQuestion(currentQuestion+1)
    }
  }

  const updateU = (updates) => {
    updateUser({ variables: { fields: updates }})
  }

  const finishQuiz = async (rec) => {
    let score = getScore(rec)
    let record = rec.map((x) => x.answer)

    if(result === null || result === undefined ) {
      let newResult = {
        userId: contextUserId,
        quizId: quiz._id,
        score: score,
        time: timer,
        badges: [],
        record: record,
        last: score,
        lastRecord: record
      }
      createResult({ variables: { input: {...newResult} }})
      updateU( { points: user.points + score } )
    }
    else {
      if(result.score < score) {
        updateResult({ variables: { resultId: result._id, update: { score: score, time: timer, record: rec.map((x) => x.answer), last: score, lastRecord: record } }})
        updateU( { points: user.points+(score-result.score) } )
      }
      else if(score <= result.score) {
        updateResult({ variables: { resultId: result._id, update: { last: score, lastRecord: record } }})
      }
    }
    setCurrentQuestion(currentQuestion+1)
    await new Promise(r => setTimeout(r, 1500));
    setScreen(3)
  }

  const canGoNext = answer !== null && currentQuestion >= 0 && currentQuestion < count

  const progressPercentage = Math.floor(currentQuestion/count*100) + "%"

  const getScore = (rec) => {
    let correct = 0
    for(let i = 0; i < count; i++) { if(rec[i].correct) correct = correct+1 }
    return Math.floor(correct/count*100)
  }

  const backgroundStyle = backgroundImage?.url ? 
    {backgroundImage: `url("${backgroundImage.url}")`, backgroundPosition: 'center', backgroundSize: 'cover', repeat: 'no-repeat'} :
    {backgroundColor: style?style.backgroundColor:"#abafbb"} 

  return (
    <>
      <QuizInSessionNav count={count} currentQuestion={currentQuestion} time={time} timerState={[timer, setTimer]} answer={answer} setScreen={setScreen}/>
      <div className="container-fluid text-white workspace-container p-5 pt-2 flex-grow-1" style={backgroundStyle}>
        <div className="container-md px-5">
          <div className="row pb-5 pt-2">
            <div className="col"></div>
            <div className="col-8">
              <div className="progress" style={{height: "12px"}}>
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width: progressPercentage}}
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax={"100"}> {progressPercentage} </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
          <div className="row py-5">
            <div className="col"></div>
            <div className="col-8 justify-content-center">
              {(currentQuestion >= 0) && (currentQuestion < count) && <Question question={content[currentQuestion]} style={style} answer={answer} setAnswer={setAnswer} /> }
              { currentQuestion === count && 
                <div className="row mt-5">
                  <div className="col"></div>
                  <div className="col-auto bg-dark p-5 rounded">
                    <h2>You have finished the Quiz!</h2>
                  </div>
                  <div className="col"></div>
                </div> }
            </div>
            <div className="col"></div>
          </div>
          <div className="row pb-5 pt-2">
            <div className='col'></div>
            <div className="col-auto align-self-center">
              {currentQuestion !== count && <button className="btn btn-sm btn-light text-dark" disabled={!canGoNext} onClick={() => goNextQ() }>{currentQuestion === count-1 ? "Finish" : "Next Question"}</button> }
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizInSession