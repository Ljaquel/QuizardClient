import React from 'react'
import Question from './Question'
import { GrNext, GrPrevious } from "react-icons/gr";
import { TiDocumentAdd } from "react-icons/ti";

const newQuestion = {
  question: "Question?",
  answer: 0,
  choices: ["Answer A", "Answer B", "Answer C", "Answer D"]
}

const Workspace = ({ backgroundImage, content, updateField, positionState, style }) => {
  const count = content.length
  const [position, setPosition] = positionState
  if (count === 0) setPosition(-1)

  const canAdd = count < 10
  const canDelete = count > 1

  const Add = () => <button className="btn btn-sm btn-light builder-btn-hover" disabled={!canAdd} onClick={() => AddQuestion()}><TiDocumentAdd size={20}/></button>
  const Prev = () => <button className="btn btn-sm btn-light builder-btn-hover" disabled={position < 1}  onClick={() => { if(position>0) setPosition(position-1)}}><GrPrevious/></button>
  const Next = () => <button className="btn btn-sm btn-light builder-btn-hover" disabled={position >= count-1} onClick={() => setPosition(position+1)}><GrNext/></button>
  
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

  const backgroundStyle = backgroundImage?.url ? 
    {backgroundImage: `url("${backgroundImage.url}")`, backgroundPosition: 'center', backgroundSize: 'cover'} :
    {backgroundColor: style?style.backgroundColor:"#abafbb"}

  return (
    <div className="container-fluid text-white workspace-container h-100" style={backgroundStyle}>
      <div className="row mb-4 pt-4 pb-5">
        <div className="col text-center">
          <div className="row justify-content-between mb-2">
            <div className="col-auto p-0 m-0 ps-3"></div>
            <div className="col-auto p-0 m-0">
              <label htmlFor="customRange2" className="form-label text-dark"><span className="badge bg-light text-dark">Question {position+1}</span></label>
            </div>
            <div className="col-auto p-0 m-0 pe-3">
              <Add/>
            </div>
          </div>
          <input type="range" className="form-range" min={0} max={count-1} value={position} onChange={(e) => setPosition(parseInt(e.target.value))} id="customRange2" ></input>
        </div>
      </div>
      <div className="row pb-4">
        <div className="col-auto p-0 m-0 align-self-center">
          <Prev/>
        </div>
        <div className="col p-0 m-0">
          <div className="container-fluid text-white">
            {(position >= 0) && (position < count) && <Question question={content[position]} updateQuestion={updateQuestion} style={style} canDelete={canDelete} deleteQuestion={DeleteQuestion} position={position}/> }
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
