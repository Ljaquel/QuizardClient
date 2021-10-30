import React from 'react'

const BuilderNav = ({ name, updateField, saveQuiz, publishQuiz, deleteQuiz }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark p-1 builder-nav-container bg-dark border-top border-bottom border-1 border-white">
      <div className="container-fluid px-2">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
                <input
                  type="name" className="form-control p-1 m-0"
                  value={name?name:""} style={{height: "25px", backgroundColor: "inherit", color: "white"}}
                  onChange={e => updateField("name", e.target.value)}/>
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
