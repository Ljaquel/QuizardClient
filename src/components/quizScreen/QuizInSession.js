import React, { useState, useEffect } from 'react'
import Question from './playground/Question'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_MUTATION } from '../../Calls'
import QuizInSessionNav from './playground/QuizInSessionNav'

const QuizInSession = ({ quiz, user,  setScreen}) => {
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

  const handleDocumentKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      goNextQ();
    }
  };

  const goNextQ = () => {
    let newRecord = [...record]
    newRecord.push(answer)
    setRecord(newRecord)
    setAnswer(null)
    if(currentQuestion === count-1) {
      setCurrentQuestion(null)
      finishQuiz()
    }
    else {
      setCurrentQuestion(currentQuestion+1)
    }
  }

  const finishQuiz = () => {
    //updateResults in user doc
    updateUser({ variables: { fields: { name: "Liomard J Mesa"} }})
    setScreen(3)
  }

  const canGoNext = answer !== null && currentQuestion >= 0 && currentQuestion < count

  return (
    <div className="container-fluid p-0 m-0">
      <QuizInSessionNav count={count} currentQuestion={currentQuestion} timer={timer} record={record} answer={answer} />
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
            <button className="btn btn-sm btn-primary" disabled={!canGoNext} onClick={() => goNextQ() }>Next Question</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizInSession