import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../../App.css'
import Choice from './Choice'

const Question = ({ question, updateQuestion:update, style }) => {
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

  const reorderAnswer = (a, s, d) => {
    if( (a<s && a<d) || (a>s && a>d) ) return a
    if(a === s) return d 
    else if(a === d) return s<d ? d-1 : d+1
    else if(s < d) {
      return a-1
    }
    else if(s > d) {
      return a+1
    }
  }

  const reorderChoice = (s, d) => {
    if(s === undefined || d === undefined || d === null || s === d) return
    let newQuestion = {...question}
    let choices = [...question.choices]
    choices.splice(d, 0, choices.splice(s, 1)[0])
    newQuestion.answer = reorderAnswer(answer, s, d)
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
    <div className="container-fluid mx-0 px-3 py-1 question-card rounded" style={{color: style?style.color:"white", backgroundColor: style?style.questionColor:"#475047"}}>
      <textarea 
        className="form-control editable-label px-0 mb-1"
        style={{color: style?style.color:"white", backgroundColor: "inherit", height: "1px", fontSize:"18px"}}
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
                      <Choice index={i} choice={c} answer={answer} style={style}
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
