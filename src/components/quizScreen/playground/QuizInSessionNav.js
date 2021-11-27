import React from 'react'
import Timer from '../playground/Timer'
//<nav className="navbar navbar-expand-sm navbar-dark p-1 builder-nav-container bg-dark border-top border-bottom border-1 border-white">

const QuizInSessionNav = ({ count, currentQuestion, time, timerState, setScreen }) => {
  return (
    <div className="container-fluid px-2 builder-nav-container bg-dark border-top border-bottom border-1 border-white">
      <div className="row p-1">
        <div className="col-auto text-light align-self-center">
          Question {currentQuestion+1} of {count}
        </div>
        <div className="col"></div>
        <div className="col-auto align-self-center">
          <Timer time={time} timerState={timerState} setScreen={setScreen}/>
        </div>
        <div className="col"></div>
        <div className="col-auto align-self-center">
          <button className="btn btn-secondary btn-sm" onClick={() => setScreen(1)}>Leave</button>
        </div>
      </div>
    </div>
  )
}

export default QuizInSessionNav