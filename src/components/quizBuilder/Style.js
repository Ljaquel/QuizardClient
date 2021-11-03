import React from 'react'

const Style = ({ style, updateField }) => {
  
  const updateStyle = (field, value) => {
    let newStyle = {...style}
    newStyle[field] = value
    updateField("style", newStyle)
  } 

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingStyles">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStyles" style={{height: "35px"}}>
          Styles
        </button>
      </h2>
      <div id="collapseStyles" className="accordion-collapse collapse" data-bs-parent="#accordionSideBar">
        <div className="accordion-body">
          <div className="row">
            <div className="col-auto">
              <label>Background Color:</label>
            </div>
            <div className="col-auto">
                <input type="color" value={style?style.backgroundColor:"#abafbb"} onInput={(e) => updateStyle("backgroundColor", e.target.value)}></input>
            </div>
          </div>
          <div className="row">
            <div className="col-auto">
              <label>Question Background:</label>
            </div>
            <div className="col-auto">
                <input type="color" value={style?style.questionColor:"#475047"} onInput={(e) => updateStyle("questionColor", e.target.value)}></input>
            </div>
          </div>
          <div className="row">
            <div className="col-auto">
              <label>Choice Background:</label>
            </div>
            <div className="col-auto">
                <input type="color" value={style?style.choiceColor:"#475047"} onInput={(e) => updateStyle("choiceColor", e.target.value)}></input>
            </div>
          </div>
          <div className="row">
            <div className="col-auto">
              <label>Text Color:</label>
            </div>
            <div className="col-auto">
                <input type="color" value={style?style.color:"#ffffff"} onInput={(e) => updateStyle("color", e.target.value)}></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Style
