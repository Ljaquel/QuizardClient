import React from 'react'
import { MdSave, MdPublish } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";

const PublishModal = ({ publishQuiz, reqs, updateReqs }) => {

  return (
    <>
      <button type="button" className="btn btn-light builder-btn-hover border-start border-end" onClick={() => updateReqs()} data-bs-toggle="modal" data-bs-target="#publishModal" ><MdPublish size={20}/></button>
      <div className="modal fade" id="publishModal" tabIndex="-1" aria-labelledby="publishModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="publishModalLabel">Publish Quiz</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {reqs.length>0 && reqs.map((r, i) => <div className="alert alert-danger" role="alert" key={i}>{r}</div>)}
              {reqs.length===0 && <div className="alert alert-warning" role="alert">Publishing a Quiz is Irreversible. You will not be able to edit the content of a quiz once published</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" disabled={reqs.length>0} data-bs-dismiss="modal" onClick={() => publishQuiz()}>Publish</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const DeleteModal = ({ deleteQuiz }) => {

  return (
    <>
      <button type="button" className="btn btn-light border-start builder-btn-hover rounded-end" data-bs-toggle="modal" data-bs-target="#deleteModal" ><RiDeleteBin2Line color="red" size={20}/></button>
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Delete Quiz</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning" role="alert">Deleting a Quiz is Irreversible!</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteQuiz()}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const BuilderNav = ({ name, updateField, unsavedChanges, saveQuiz, publishQuiz, deleteQuiz, reqs, updateReqs, published }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark p-1 builder-nav-container bg-dark border-top border-bottom border-1 border-white">
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
            <button type="button" className="btn btn-light position-relative border-end builder-btn-hover" onClick={saveQuiz}>
              <MdSave size={20}/>
              {unsavedChanges &&
              <span className="position-absolute top-0 start-0 translate-middle p-1 bg-primary border border-light rounded-circle">
                <span className="visually-hidden">New alerts</span>
              </span>}
            </button>
            {!published && <PublishModal publishQuiz={publishQuiz} reqs={reqs} updateReqs={updateReqs} published={published}/> }
            <DeleteModal deleteQuiz={deleteQuiz} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default BuilderNav
