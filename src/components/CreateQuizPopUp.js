
import { Component, useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth";
import { gql, useQuery, useMutation } from '@apollo/client';
function CreateQuizPopUp(props) {
  const context = useContext(AuthContext);

  const [values, setValues] = useState({

    quizname:    "",
    categories:  "",
    quizDuration: "",
    numofQuestions: "",


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




//   const [addQuiz] = useMutation(CREATE_QUIZ, {
//       variables: { name: "Quiz Name", creator: user?._id },
//       update(proxy, result){
//         proxy.writeQuery({
//           query: FETCH_QUIZZES_QUERY,
//           data: {
//             getQuizzes: [result.data.createQuiz, ...data.getQuizzes]
//           }
//         })
//       }
//     });







  const handleClose = () => {
      props.createfuntion()
     
      console.log(values)
      setShow(false);

  }
  
  

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
            className="container-fluid bg-light p-5 mt-5"
            style={{ maxWidth: "700px" }}
          >
            <div className="container mb-5">
              
            </div>
            <div className="m-3 row justify-content-center">
              <label className="form-label col-4">Quiz Name:</label>
              <input
            
                name="quizname"
                className="form-control col"
                id="quizname"
                value={values.quizname}
                onChange={onChange}
              />
            </div>

            <div className="m-3 row justify-content-center">
              <label className="form-label col-4">Category</label>
              <input
            
                name="categories"
                className="form-control col"
                id="categories"
                value={values.categories}
                onChange={onChange}
              />
            </div>

            <div className="m-3 row justify-content-center">
              <label className="form-label col-4">Duration</label>
              <input
            
                name="quizDuration"
                className="form-control col"
                id="quizDuration"
                value={values.quizDuration}
                onChange={onChange}
              />
            </div>

            <div className="m-3 row justify-content-center">
              <label className="form-label col-4">Number of Questions</label>
              <input
            
                name="numofQuestions"
                className="form-control col"
                id="numofQuestions"
                value={values.numofQuestions}
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const CREATE_QUIZ = gql`
  mutation createQuiz($name: String!, $creator: String!){
    createQuiz(name: $name, creator: $creator) {
      name
      creator
    }
  }
`

export default CreateQuizPopUp;
