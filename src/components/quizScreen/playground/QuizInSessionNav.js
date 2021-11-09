import React from 'react'

const QuizInSessionNav = ({ count, currentQuestion, timer, record, answer }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark p-1 builder-nav-container bg-dark border-top border-bottom border-1 border-white">
      <div className="container-fluid px-2">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-light">
            <li className="navbar-item px-4">
              Total # of Questions: {count}
            </li>
            <li className="navbar-item px-4">
              Question #{currentQuestion+1}
            </li>
            <li className="navbar-item px-4">
              Time Limit: {timer} 
            </li>
            <li className="navbar-item px-4">
              Record: {record.length?record:"[]"}
            </li>
            <li className="navbar-item px-4">
              Current Answer: {answer!==null?answer:"none"}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default QuizInSessionNav