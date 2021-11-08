import React from 'react'

import '../../../App.css'
import Choice from './Choice'

const Question = ({ question, style, answer, setAnswer }) => {
  const choices = question?.choices

  return (
    <div className="container-fluid mx-0 px-3 py-1 question-card rounded" style={{color: style?style.color:"white", backgroundColor: style?style.questionColor:"#475047"}}>
      <div className="row m-0 p-0 px-0 mt-4 align-items-center border border-1 border-secondary rounded">
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
