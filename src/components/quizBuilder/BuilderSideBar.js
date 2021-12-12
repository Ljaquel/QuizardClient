import React, { useState } from 'react'

import Style from './Style'
import QuestionsList from './QuestionsList'
import Images from './Images'
import categories from '../../util/Categories'

const BuilderSideBar = ({ quiz, updateField, positionState }) => {
  const { _id, tags, difficulty, time, style, backgroundImage, content, thumbnail, category } = quiz
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
    <div className="container-fluid px-0 h-100 bg-light">

      <div className="row mx-0 px-0 bg-light pt-2">
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
            <label className="input-group-text" htmlFor="categorySelect">Category</label>
            <select id="categorySelect" className="form-select form-select-sm" value={category} onInput={e => updateField("category", e.target.value)}>
              {categories && categories.map((c, i) => 
                <option value={c} key={i} >{c}</option>
              )}
            </select>
          </div>
        </div>
      </div>


      <div className="row px-2">
        <div className="col">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="difficultySelect">Dificulty</label>
            <select id="dificultySelect" className="form-select form-select-sm" value={difficulty} onInput={e => updateField("difficulty", e.target.value)}>
              <option value="Easy" >Easy</option>
              <option value="Medium" >Medium</option>
              <option value="Hard" >Hard</option>
              <option value="Expert">Expert</option>
            </select>
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
            <Images thumbnail={thumbnail} backgroundImage={backgroundImage} updateField={updateField} _id={_id}/>
          </div>
        </div>
      </div>


    </div>
  )
}

export default BuilderSideBar