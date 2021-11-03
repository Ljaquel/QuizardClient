import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../../App.css'
import Choice from './Choice'

const Question = ({ question, updateQuestion:update, color }) => {
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

  const reorderChoice = (s, d) => {
    if(s === undefined || d === undefined || d === null) return
    let newQuestion = {...question}
    let choices = [...question.choices]
    choices.splice(d, 0, choices.splice(s, 1)[0])
    newQuestion.choices = choices
    update(newQuestion)
  }

  const addChoice = () => {
    if(question?.choices.length >= 6) return
    let newQuestion = {...question}
    let choices = [...question.choices]
    choices.push("Blank choice")
    newQuestion.choices = choices
    update(newQuestion)
  }

  const deleteChoice = (i) => {
    if(question?.choices.length <= 2) return
    let newQuestion = {...question}
    let choices = [...question.choices]
    choices.splice(i, 1)
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

      <DragDropContext onDragEnd={({source, destination}) => reorderChoice(source?.index, destination?.index)}>
        <Droppable id="ChoicesListDroppable" droppableId={"choicesListDroppable"}>
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {choices && choices.map((c, i) =>
                <Draggable key={i} draggableId={"choice-"+i} index={i}>
                  {(provided, snapshot) => (
                    <div key={i} index={i} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging ? "0 0 0.4rem #666" : "none"}}
                    >
                      <Choice index={i} choice={c} isAnswer={i === answer}
                        updateAnswer={updateAnswer} updateChoice={updateChoice} deleteChoice={deleteChoice}
                      />
                    </div>
                  )}
                </Draggable>
              )}
              <div className="my-1"> {provided.placeholder} </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="row" onClick={() => addChoice()}>
        <div className="col-6 offset-3 text-center">
          <button className="btn btn-outline-secondary w-100">+</button>
        </div>
      </div>

    </div>
  )
}

export default Question
