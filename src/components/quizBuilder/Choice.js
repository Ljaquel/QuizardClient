import React from 'react'

const Choice = ({index, choice, isAnswer, updateChoice, updateAnswer}) => {
  return (
    <div className="row m-0 p-0 px-0 mb-1">
      <div className="col col-auto p-0 m-0 align-self-center">
        <input className="form-check-input" type="radio" name="flexRadioDefault" defaultChecked={isAnswer} onClick={() => updateAnswer(index)}></input>
      </div>
      <div className="col">
        <textarea 
          className="form-control editable-label px-2"
          style={{color: "white", backgroundColor: "inherit", height: "1px", fontSize:"13px"}}
          placeholder="Write choice here"
          value={choice}
          onChange={(e) => updateChoice(index, e.target.value)}
          />
      </div>
    </div>
  )
}

export default Choice;