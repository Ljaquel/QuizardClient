import { Component, useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { gql, useQuery, useMutation } from "@apollo/client";

import { CREATE_QUIZ, FETCH_QUIZZES_QUERY } from "../Calls";
import { AuthContext } from "../context/auth";
import Loading from "../components/Loading";

function CreateQuizPopUp() {
  const { user } = useContext(AuthContext);

  const [values, setValues] = useState({
    quizname: "", 
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

  const [addQuiz] = useMutation(CREATE_QUIZ, {
    variables: { name: values.quizname, creator: user?._id },
    update(cache, { data: { createQuiz } }) {
      cache.writeQuery({
        query: FETCH_QUIZZES_QUERY,
        data: {
          getQuizzes: [createQuiz, ...data.getQuizzes],
        },
      });
    },
  });

  const { data, refetch } = useQuery(FETCH_QUIZZES_QUERY);
//   useEffect(() => {
//       refetch()
//     }, [refetch]);


  if (!data) {
    return <Loading />;
  }
  const { getQuizzes: quizzes } = data;

  const handleClose = () => {setShow(false)};

  const createQuizPressed = () => {
        if (values.quizname ==="")              //if QuizName texfield empty then show Error message
                    document.getElementById('quiznameTextfield').reportValidity();        
        else{
            
            addQuiz();
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
          <div 
            style={{ maxWidth: "700px" }}
          >
            <div className="m-3 row justify-content-center">
                 
              <label className="form-label col-4">Quiz Name:</label>
              <input
                id="quiznameTextfield"
                required
                type="text"
                placeholder="Quiz Name"
                name="quizname"
                className="form-control col"
                
                value={values.quizname}
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
