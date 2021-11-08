import React, { useState, useEffect } from 'react'
import Question from './playground/Question'

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
    setScreen(3)
  }

  const canGoNext = answer !== null && currentQuestion >= 0 && currentQuestion < count

  return (
    <div className="container-fluid p-0 m-0">
      <div className="container-fluid">
        <div className="row p-2 m-2">
          <div className="col align-self-center">
            <h6>Total # of Questions: {count}</h6>
            <h6>Question #{currentQuestion+1}</h6>
            <h6>Time Limit: {timer}</h6>
            <h6>Record: {record.length?record:"[]"}</h6>
            <h6>Current Answer: {answer!==null?answer:"none"}</h6>
          </div>
        </div>
      </div>
      <div className="container-fluid text-white workspace-container" style={{backgroundColor: style?style.backgroundColor:"#abafbb"}}>
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