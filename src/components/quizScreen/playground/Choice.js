import React from 'react'

const Choice = ({index, choice, answer, setAnswer, style}) => {
  return (
    <div className="row m-0 p-0 px-0 py-2 my-2 align-items-center border border-1 border-secondary rounded choice"
      style={{backgroundColor: style? style.choiceColor:"#475047", cursor: "pointer"}}
      onClick={() => setAnswer(index)}
      >
      <div className="col col-auto p-0 ps-3 m-0 align-self-center">
        <input className="form-check-input" type="radio" name="flexRadioDefault" value={index} checked={index === answer}></input>
      </div>
      <div className="col">
        <p className="px-2 lead"
          style={{color: style?style.color:"white", backgroundColor: "inherit", height: "1px", fontSize:"13px", pointerEvents: "none"}}
          >
          {choice}
        </p>
      </div>
    </div>
  )
}

export default Choice;