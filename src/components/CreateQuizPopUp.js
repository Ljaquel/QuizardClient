import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function CreateQuizPopUp({ addQuiz }) {
  const [values, setValues] = useState({
    quizName: "", 
    error: null,
  });

  const onChange = (e) => {
    if (values.error) {
      setValues({ ...values, [e.target.name]: e.target.value, error: null });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)};

  const createQuizPressed = () => {
    if (values.quizName === "")
      document.getElementById('quizNameTextfield').reportValidity();        
    else{
      addQuiz({variables: {name: values.quizName}});
      handleClose()
    }
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Quiz
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxWidth: "700px" }}>
            <div className="m-3 row justify-content-center">
              <label className="form-label col-4">Quiz Name:</label>
              <input
                id="quizNameTextfield"
                required
                type="text"
                placeholder="Quiz Name"
                name="quizName"
                className="form-control col"
                value={values.quizName}
                onChange={onChange} 
              /> 
            </div>
            {values.error && (
              <div className="container mb-5 red">
                {values.error.message + ". Please try Again!"}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createQuizPressed} type="submit">
            Create Quiz
          </Button> 
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateQuizPopUp;