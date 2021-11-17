import React from 'react'
import Timer from '../playground/Timer'

const QuizInSessionNav = ({ count, currentQuestion, time, timerState, setScreen }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark p-1 builder-nav-container bg-dark border-top border-bottom border-1 border-white">
      <div className="container-fluid px-2">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-light">
            <li className="navbar-item px-4">
              <button className="btn btn-danger btn-sm" onClick={() => setScreen(1)}>Leave</button>
            </li>
            <li className="navbar-item px-4">
              Total # of Questions: {count}
            </li>
            <li className="navbar-item px-4">
              Question #{currentQuestion+1}
            </li>
            <li className="navbar-item px-4">
              <Timer time={time} timerState={timerState} setScreen={setScreen}/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default QuizInSessionNav