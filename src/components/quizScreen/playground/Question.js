import React from 'react'

import '../../../App.css'
import Choice from './Choice'

const Question = ({ question, style, answer, setAnswer }) => {
  const choices = question?.choices

  return (
    <div className="container-fluid px-5 py-4 question-card rounded" style={{color: style?style.color:"white", backgroundColor: style?style.questionColor:"#475047"}}>
      <div className="row mx-0 py-3 px-3 mt-2 mb-4 align-items-center">
        <div className="col col-auto align-self-center">
          <span className="" style={{color: style?style.color:"white", backgroundColor: "inherit", pointerEvents: "none"}}>
            {question?.question}
          </span>
        </div>
      </div>
      {choices && choices.map((c, i) => <Choice key={i} index={i} choice={c} answer={answer} setAnswer={setAnswer} style={style}/> )}
    </div>
  )
}

export default Question
