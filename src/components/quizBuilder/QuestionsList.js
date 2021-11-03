import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const QuestionsList = ({ updateField, content, positionState}) => {
  const [position, setPosition] = positionState

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingQuestions">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseQuestions" style={{height: "35px"}}>
          Explorer
        </button>
      </h2>
      <div id="collapseQuestions" className="accordion-collapse collapse show" data-bs-parent="#accordionSideBar">
        <div className="accordion-body">
          <DragDropContext onDragEnd={({source, destination}) => {
            if(source === null || source === undefined) return
            if(destination === null || destination === undefined) return
            const { index:sourceI } = source
            const { index:destinationI } = destination
            let newContent = [...content]
            newContent.splice(destinationI, 0, newContent.splice(sourceI, 1)[0])
            setPosition(destinationI)
            updateField("content", newContent)
            }
          }>
            <Droppable id="QuestionsListDroppable" droppableId={"questionsListDroppable"}>
              {(provided, _) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {content && content.map((q, i) => {
                    let question = q.question
                    if(question.length > 26) question = question.substring(0, 26) + "..."
                    return (
                      <Draggable key={i} draggableId={""+i} index={i}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging ? "0 0 0.4rem #666" : "none"}}
                            {...provided.draggableProps} index={i} onClick={() => setPosition(i)} 
                            className="cursor-pointer">
                            <span className="pe-3" {...provided.dragHandleProps} >=</span>
                            {position !== i ? question : <strong>{question}</strong>}
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}

export default QuestionsList
