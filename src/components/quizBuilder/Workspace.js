import React from 'react'
import Question from './Question'

const Workspace = ({ content }) => {
  return (
    <div className="container-fluid text-white bg-secondary">
      Questions
      {content && content.map((question, index) => <Question key={index} question={question}/>)}
    </div>
  )
}

export default Workspace
