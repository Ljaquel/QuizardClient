import React from 'react'

const Choice = ({index, choice, answer, updateChoice, updateAnswer, deleteChoice, style}) => {
  return (
    <div className="row m-0 p-0 px-0 py-2 my-1 align-items-center border border-1 border-secondary rounded" style={{backgroundColor: style? style.choiceColor:"#475047"}}>
      <div className="col col-auto pe-3 m-0">=</div>
      <div className="col col-auto p-0 m-0 align-self-center">
        <input className="form-check-input" type="radio" name="flexRadioDefault" value={index} checked={index === answer} onChange={() => updateAnswer(index)}></input>
      </div>
      <div className="col">
        <textarea 
          className="form-control editable-label px-2"
          spellCheck="false"
          style={{color: style?style.color:"white", backgroundColor: "inherit", height: "1px", fontSize:"13px"}}
          placeholder="Write choice here"
          value={choice}
          onChange={(e) => updateChoice(index, e.target.value)}
          />
      </div>
      <div className="col col-auto pe-3 m-0 cursor-pointer" onClick={() => deleteChoice(index)}>x</div>
    </div>
  )
}

export default Choice;