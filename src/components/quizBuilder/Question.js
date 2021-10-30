import React from 'react'
import '../../App.css'
import Choice from './Choice'

const Question = ({ question, updateQuestion:update }) => {
  const { choices, answer } = question

  const updateQuestion = (str) => {
    let newQuestion = {...question, question: str}
    update(newQuestion)
  }

  const updateAnswer = (index) => {
    let newQuestion = {...question, answer: index}
    update(newQuestion)
  }

  const updateChoice = (index, str) => {
    let newQuestion = {...question}
    let choices = [...question.choices]
    choices[index] = str
    newQuestion.choices = choices
    update(newQuestion)
  }

  return (
    <div className="container-fluid mx-0 px-3 py-1 question-card rounded">
      <textarea 
        className="form-control editable-label px-0 mb-1"
        style={{color: "white", backgroundColor: "inherit", height: "1px", fontSize:"18px"}}
        placeholder="Write question here"
        value={question?.question}
        onChange={(e) => updateQuestion(e.target.value)}
        />
      {choices && choices.map(
        (choice, index) => <Choice key={index} index={index} choice={choice} isAnswer={index === answer} updateAnswer={updateAnswer} updateChoice={updateChoice}/>
      )}
    </div>
  )
}

export default Question
