import React from 'react'
import Choice from './Choice'

const Question = ({ question }) => {
  const { choices } = question
  return (
    <div>
      <h3>{question?.question}</h3>
      {choices && choices.map((choice, index) => <Choice key={index} choice={choice} isAnswer={index===question?.answer}/>)}
    </div>
  )
}

export default Question
