import React, { useState } from 'react'
import QuestionsList from './QuestionsList'
import Style from './Style'

const BuilderSideBar = ({ tags, difficulty, time, style, updateField, content, positionState }) => {
  const [tag, setTag] = useState("")

  const AddTag = () => {
    if (tags.length >= 15) return
    let newTags = [...tags]
    newTags.push(tag)
    setTag("")
    updateField("tags", newTags)
  }

  const DeleteTag = (i) => {
    let newTags = [...tags]
    newTags.splice(i, 1)
    updateField("tags", newTags)
  }
  
  return (
    <div className="container-fluid bg-light px-0">


      <div className="row mx-0 px-0 bg-light mt-2">
        <div className="col-12">
          {tags && tags.map((t, index) => 
            <span className="badge rounded-pill bg-dark m-1" key={index} index={index}>
              {t}<span className="text-danger ms-2 cursor-pointer delete-tag" onClick={() => DeleteTag(index)}>x</span>
            </span>
          )}
        </div>
        <div className="col-12 mt-1">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Add Tag" value={tag} onChange={e => setTag(e.target.value)}/>
            <button className="btn btn-outline-secondary" type="button" onClick={() => AddTag()}>Add</button>
          </div>
        </div>
      </div>


      <div className="row px-2">
        <div className="col">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="difficultySelect">Dificulty</label>
            <select id="dificultySelect" className="form-select form-select-sm" value={difficulty} onInput={e => updateField("difficulty", e.target.value)}>
              <option value="easy" >Easy</option>
              <option value="medium" >Medium</option>
              <option value="hard" >Hard</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </div>


      <div className="row px-2">
        <div className="col">
          <div className="input-group">
            <input type="file" className="form-control" id="thumbnailFile"></input>
            <label className="input-group-text" htmlFor="thumbnailFile">Upload</label>
          </div>
        </div>
      </div>


      <div className="row my-2 ps-2">
        <div className="col-auto">
          <label>Time Limit:</label>
        </div>
        <div className="col-auto">
            <input type="number" value={!time? 0 : time[1] === '1'? 60 : parseInt(time.substring(3, 5)) } min={0} max={60}
              onInput={({target}) => { 
                let v = target.value
                updateField("time", v>=60?'01:00:00':v<=0?'00:00:00':v>9?("00:"+v+":00"):("00:0"+v+":00"))
              }}
            ></input>
        </div>
      </div>


      <div className="row mt-4">
        <div className="col">
          <div className="accordion" id="accordionSideBar">
            <QuestionsList updateField={updateField} positionState={positionState} content={content}/>
            <Style style={style} updateField={updateField}/>
          </div>
        </div>
      </div>


    </div>
  )
}

export default BuilderSideBar