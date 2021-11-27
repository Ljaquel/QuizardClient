import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function CreatePlatformPopUp({ addPlatform }) {
  const [values, setValues] = useState({
    platformName: "", 
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

  const createPlatformPressed = () => {
    if (values.platformName === "")
      document.getElementById('platformNameTextfield').reportValidity();        
    else{
      addPlatform({ variables: { name: values.platformName }});
      handleClose()
    }
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn py-1 px-2 border border-2" onClick={handleShow}>
        Add Platform
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Platform</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxWidth: "700px" }}>
            <div className="m-3 row justify-content-center">
              <label className="form-label col-4">Platform Name:</label>
              <input
                id="platformNameTextfield"
                required
                type="text"
                placeholder="Platform Name"
                name="platformName"
                className="form-control col"
                value={values.platformName}
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
          <Button variant="primary" onClick={createPlatformPressed} type="submit">
            Create Platform
          </Button> 
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePlatformPopUp;