import React from 'react'

const Description = ({ description, updateField }) => {
  return (
    <div className="container-xxl description-container p-1 border-top border-white h-100">
      <div className="form-floating h-100">
        <textarea
          className="form-control h-100"
          placeholder="Provide a description here"
          value={description}
          spellCheck="false"
          onChange={e => updateField("description",  e.target.value?.length > 400 ? e.target.value.substring(0, 401) : e.target.value)}
          style={{resize: 'none'}}
          />
        <label htmlFor="floatingTextarea">Description</label>
      </div>
    </div>
  )
}

export default Description
