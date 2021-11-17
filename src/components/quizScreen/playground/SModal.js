import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const SModal = ({ setScreen, show, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      onExited={() => setScreen(1)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Time is Up!</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShow(false)}>Understood</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SModal
