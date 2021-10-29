import React from 'react'

const BuilderNav = ({ name, updateField, saveQuiz, publishQuiz, deleteQuiz }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-secondary p-1 mb-1">
      <div className="container-fluid px-2">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
                <input type="name" className="form-control p-1 m-0" value={name?name:""} onChange={e => updateField("name", e.target.value)}/>
            </li>
          </ul>
          <div className="btn-group btn-group-sm" role="group">
            <button type="button" className="btn btn-success" onClick={saveQuiz}>Save</button>
            <button type="button" className="btn btn-primary" onClick={publishQuiz}>Publish</button>
            <button type="button" className="btn btn-danger" onClick={deleteQuiz}>Delete</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default BuilderNav
