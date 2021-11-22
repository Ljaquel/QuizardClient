import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { Modal, Button } from "react-bootstrap";
import { DELETE_PLATFORM } from '../Calls'
import { AuthContext } from '../context/auth'

function DeletePlatformPopUp(props) {
  const { platform, count } = props
  const { contextUserId } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)};

  const [deletePlatform] = useMutation(DELETE_PLATFORM, {
    onCompleted(data) { if(!data.deletePlatform) return ; props.history.push('/profile/' + contextUserId) },
    onError(err) { console.log(err) },
    variables: { platformId: platform._id}
  })

  const deletePlatformPressed = () => {
    handleClose()
    deletePlatform()
  }

  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn bg-danger text-white" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={handleShow}>
        X
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Platform</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {count > 0 &&
            <div className="alert alert-danger" role="alert">
              Delete all quizzes under this platform first!
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" disabled={count>0} onClick={deletePlatformPressed}>
            Delete Platform
          </Button> 
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePlatformPopUp;