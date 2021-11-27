import React from 'react'

const QuestionResult = ({question, chosen, correct, i, last}) => {
  return (
    <div className={`container-lg border ${chosen===correct?"border-success":"border-danger"} border-2 ${last?'':'mb-2'} px-5 py-2 rounded bg-light`}>
      <h5>{i+1}) {question.question}</h5>
      {chosen !== correct && <div className="text-dark rounded mt-1 px-3 py-1 bg-danger text-white">
        {question.choices[chosen]}
      </div>}
      <div className="text-dark rounded mt-1 px-3 py-1 bg-success text-white">
        {question.choices[correct]}
      </div>
    </div>
  )
}

export default QuestionResult
