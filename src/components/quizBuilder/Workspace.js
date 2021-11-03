import React from 'react'
import Question from './Question'

const newQuestion = {
  question: "Question?",
  answer: -1,
  choices: ["Answer A", "Answer B", "Answer C", "Answer D"]
}

const Workspace = ({ content, updateField, positionState, color }) => {
  const count = content.length
  const [position, setPosition] = positionState
  if (count === 0) setPosition(-1)

  const canAdd = count < 10
  const canDelete = count > 1

  const Add = () => <button className="btn btn-sm btn-primary" disabled={!canAdd} onClick={() => AddQuestion()}>Add</button>
  const Prev = () => <button className="btn btn-sm btn-primary" disabled={position < 1}  onClick={() => { if(position>0) setPosition(position-1)}}>Previous</button>
  const Next = () => <button className="btn btn-sm btn-primary" disabled={position >= count-1} onClick={() => setPosition(position+1)}>Next</button>
  const Delete = () => <button className="btn btn-sm btn-danger" disabled={!canDelete} onClick={() => DeleteQuestion(position)}>Delete</button>
  
  const AddQuestion = () => {
    if (!canAdd) return
    let newContent = [...content]
    newContent.splice(position+1, 0, newQuestion)
    updateField("content", newContent)
    setPosition(position+1)
  }

  const DeleteQuestion = () => {
    if (!canDelete) return 
    let newContent = [...content]
    newContent.splice(position, 1)
    updateField("content", newContent)
    if(position !== 0) setPosition(position-1)
  }

  const updateQuestion = (q) => {
    let newContent = [...content]
    newContent[position] = q
    updateField("content", newContent)
  }

  return (
    <div className="container-fluid text-white workspace-container">
      <div className="row mb-4 pt-4">
        <div className="col text-center">
          <label htmlFor="customRange2" className="form-label text-dark">Question {position+1}</label>
          <input type="range" className="form-range" min={0} max={count-1} value={position} onChange={(e) => setPosition(parseInt(e.target.value))} id="customRange2" ></input>
        </div>
      </div>
      <div className="row justify-content-end mb-2">
        <div className="col-auto p-0 m-0">
          <Add/>
          <Delete/>
        </div>
      </div>
      <div className="row pb-4">
        <div className="col-auto p-0 m-0 align-self-center">
          <Prev/>
        </div>
        <div className="col p-0 m-0">
          <div className="container-fluid text-white">
            {(position >= 0) && (position < count) && <Question question={content[position]} updateQuestion={updateQuestion} color={color}/> }
          </div>
        </div>
        <div className="col-auto p-0 m-0 align-self-center">
          <Next/>
        </div>
      </div>
    </div>
  )
}

export default Workspace
