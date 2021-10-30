import React from 'react'

const Description = ({ description, updateField }) => {
  return (
    <div className="container-xxl description-container p-1 border-top border-white">
      <div className="form-floating">
        <textarea className="form-control" placeholder="Provide a description here" value={description} onChange={e => updateField("description", e.target.value)}/>
        <label htmlFor="floatingTextarea">Description</label>
      </div>
    </div>
  )
}

export default Description
