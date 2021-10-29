import React from 'react'

const Description = ({ description, updateField }) => {
  return (
    <div className="container-xxl bg-light p-1">
      <div className="form-floating">
        <textarea className="form-control" placeholder="Provide a description here" value={description} onChange={e => updateField("description", e.target.value)}/>
        <label htmlFor="floatingTextarea">Description</label>
      </div>
    </div>
  )
}

export default Description
