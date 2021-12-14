import React, { useContext, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import { BsFillPlayFill } from 'react-icons/bs';
import Rating from '@mui/material/Rating';
import moment from 'moment';

import { AuthContext } from '../../context/auth'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_RESULT,FETCH_USER_QUERY, UPDATE_QUIZ_MUTATION, FETCH_RESULTS_QUERY,FETCH_QUIZZES_QUERY,FETCH_SEARCH_RESULTS_QUERY} from "../../Calls";

import Loading from '../Loading'
import QuestionResult from '../quizResults/QuestionResult'
import QuizHomeCard from './QuizHomeCard';

const QuizResults = ({ quiz, user, setScreen, refetchQuiz, history } ) => {
  // const { quiz } = props
  const { contextUserId } = useContext(AuthContext)
  // const { user } = props
  
  const [comment, setComment] = useState("");
  const [waitingOne, setWaitingOne] = useState(false);
  const [waitingTwo, setWaitingTwo] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)};
  
  const handleShow = () => setShow(true); 

   const { data, loading, refetchResult } = useQuery(FETCH_RESULTS_QUERY, {
    pollInterval: 100,
    onError(err) { console.log(JSON.stringify(err, null, 2));console.log("refetchResult Error") },
    variables: { filters: { userId: user._id, quizId: quiz._id} }
  })
  const { data: tagsData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { variables: { query: "math", searchFilter:"Tag" } });

  const { data:creatorData } = useQuery(FETCH_USER_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { userId: quiz?.creator._id }
  })
  const creator = creatorData?.getUser
  const result = data?.getResults[0]

  const { data: categoriesData } = useQuery(FETCH_QUIZZES_QUERY, { variables: { filters: {category: quiz.category, published: true} } });
  let categorizedQuizzes = []
  if(categoriesData?.getQuizzes) {
    categorizedQuizzes = [...categoriesData.getQuizzes.filter(q => q._id !== quiz._id)]
    categorizedQuizzes = categorizedQuizzes.sort((a, b) => a?.rating<b?.rating?1:a?.rating===b?.rating?0:-1)
  }
  if (categorizedQuizzes?.length > 4) {
    categorizedQuizzes = categorizedQuizzes.splice(0, 4)
  }

  const [updateRating] = useMutation(UPDATE_RESULT, {
    onCompleted() { refetchResult(); setWaitingOne(false) },
    onError(err) { console.log(JSON.stringify(err, null, 2)); setWaitingOne(false); console.log("updateRating Error") },
  });
  const [updateQuiz] = useMutation(UPDATE_QUIZ_MUTATION, {
    onCompleted() { refetchQuiz(); setWaitingTwo(false); console.log('success') },
    onError(err) { console.log(JSON.stringify(err, null, 2)); setWaitingTwo(false); console.log("updateQuiz Error") },
  });
  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: { quizId: quiz._id, user: user._id },
    onCompleted() { setComment(""); refetchQuiz(); },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, { 
    variables: { quizId: quiz._id },
    onCompleted() { refetchQuiz(); },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
  });

  const onRatingClick = (v) => { 
    if(!result || waitingOne || waitingTwo) return
    setWaitingOne(true)
    setWaitingTwo(true)
    let newRating = ((quiz.rating*quiz.ratingCount)+v-result.rating)/(quiz.ratingCount)
    if(result.rating === -1) newRating = ((quiz.rating*quiz.ratingCount)+v)/(quiz.ratingCount+1)
    console.log(quiz._id)
    console.log(newRating) 
    console.log(result.rating===-1?quiz.ratingCount+1:quiz.ratingCount)
     
    updateQuiz({variables: {quizId: quiz._id, update: {rating: newRating, ratingCount: result.rating===-1?quiz.ratingCount+1:quiz.ratingCount} }})
    updateRating({ variables: {resultId: result._id, update: {rating: v}}})
  }
  const bProps = { backgroundSize: 'cover', backgroundPosition: 'center'}
  const goToC = () => { history.push(`/profile/${creator._id}`) }
  if(loading) return <Loading />

  return (
    <div>
      
      <div className="container-fluid d-flex flex-column overflow-auto">
        
        <div className="row px-1"> 
          <div className="col-2 px-0 rounded-top border border-1"> 
              {result ?
                <>
                  <h2 className="rounded-top text-center"  style={{backgroundColor:creator.color}}> Result </h2> 
                  <div className="list-group-item d-flex justify-content-between"> <small>Times Taken: </small> <small>  {result.timesTaken }</small> </div>
                  <div className="list-group-item d-flex justify-content-between"> <small>Last Score: </small> <small>  {result.last}  </small> </div>
                  <div className="list-group-item d-flex justify-content-between"> <small>Highest Score: </small> <small> { result.score }</small> </div>
                  <div className="list-group-item d-flex justify-content-between"> <small>Last Taken: </small> <small> { moment(result.modifiedAt).fromNow() }</small> </div>
                  <div className="list-group-item d-flex justify-content-between"> <small>First Taken: </small> <small> { moment(result.createdAt).fromNow() }</small> </div>
                  
                  
                </>
                :
                <div className="list-group-item d-flex justify-content-between"> <small>Quiz Not Taken{quiz?.name}</small> </div>
              } 
            <div class="card platform-card rounded w-100 mb-1" ></div>
          </div>

          <div className="col-8 d-flex flex-column px-1"> 
            <div className="d-flex flex-column rounded-top" style={{position: 'relative', height:"500px",background: creator.color , backgroundImage: `url("${quiz.thumbnail?.url}")`, backgroundPosition:"center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>      
              <div className=" rounded w-75 h-75 d-flex flex-column m-auto pt-1 pb-2 text-center" style={{background:"rgba(64, 43, 41, 0.85)" }}>   
                <h3 className="text-light text-center"> Thank You {user.name} !</h3>
                <h5 className="text-light">You have taken " {quiz.name} " !</h5> 
                <h5><span className="badge bg-success text-light"> Score: {result ? result.last : "..."}/100</span></h5>
                <h4 className="text-light">Rate This Quiz :</h4>
                <div className=" " variant="success"> <Rating name={waitingOne || waitingTwo || !result ? "disabled" : "simple-controlled"} value={result?.rating && result.rating >= 0 ? result.rating : null} disabled={!result || waitingOne || waitingTwo} onChange={(e, v) => onRatingClick(v)} precision={0.5} /> </div>                
                <br />
                <div className="col-12 p-0 d-flex justify-content-evenly">
                  <Button varient="success "className="col-4 btn text-light"  style={{ }} onClick={() => history.push("/")}>Go Home</Button>                  
                  <Button variant="success" className="col-4 btn text-light  " style={{}} onClick={handleShow}> Review Answers </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton> <Modal.Title>Results</Modal.Title> </Modal.Header>
                    <Modal.Body>
                      <div style={{ maxWidth: "800px" }}> { quiz && result && quiz.content.map((q, i) => <QuestionResult key={i} question={q} chosen={result.lastRecord[i]} correct={q.answer} i={i} last={i===quiz.content.length-1}/>)} </div>
                    </Modal.Body>
                    <Modal.Footer> <Button variant="secondary" onClick={handleClose}> Close  </Button> </Modal.Footer>
                  </Modal>     
                </div>
              </div>
            </div>

            <div className="row pt-2 px-2 m-0">
              <div className="row pt-2 px-0">
                <h5>Comments</h5>
              </div>
              <div className="row pt-2 px-0">
                <div className="col-12">
                  <input type="text" className="form-control" placeholder="Enter a comment" value={comment} onChange={e => setComment(e.target.value)} />
                </div>
                <div className="col-auto ms-auto">
                  <button onClick={() => createComment({ variables: {body: comment}})} className="btn btn-primary btn-sm">Post</button>
                </div>
              </div>
              {quiz.comments && quiz.comments.map((comment) => (
                <div key={comment._id} className="row rounded border border-1 m-0">
                  <div className="col">
                    <span className="badge bg-primary">{comment.user.username}</span>
                    <span> - <small>{moment(comment.createdAt).fromNow()}</small></span>
                    <p>{comment.body}</p>
                  </div>
                  {comment.user._id === user._id && <div className="col-auto mt-2">
                    <button onClick={() => deleteComment({ variables: {commentId: comment._id}})} className="btn btn-danger btn-sm">x</button>
                  </div>}
                </div>
              ))}
              
            </div>    
          </div>

          <div className="col-2 d-flex flex-column pt-1 px-1" style={{overflow: "auto"}}>                
            <div className="border border-1 rounded-top mb-2 pointer card-hover" onClick={goToC}>
              <h4 className="rounded-top text-center py-1" style={{backgroundColor:creator.color}}>Creator</h4>
              <div className="mx-auto my-2 rounded-circle border border-2" style={{width: '130px', height: '130px', ...bProps, backgroundImage: `url(${creator?.avatar?.url ? creator?.avatar?.url : `https://res.cloudinary.com/ljaquel/image/upload/v1637536528/admin/profile_uvnezs.png`})`}}/>     
              <h5 className="text-center">{quiz?.user?.name} </h5> 
            </div>            
            <div className="rounded-top mb-2">
              <h4 className="rounded-top text-center py-1 m-0" style={{backgroundColor:creator.color}}>Quiz Information </h4> 
              <div className="list-group-item d-flex justify-content-between"> <small>Time: </small> <small>  { quiz.time.substring(3, 5)} mins </small> </div>
              {/* <div className="list-group-item d-flex justify-content-between"> <small>points: </small> <small> 100 </small> </div>         */}
              <div className="list-group-item d-flex justify-content-between"> <small>Questions: </small> <small>  {quiz.content.length} </small> </div>
              <div className="list-group-item d-flex justify-content-between"> <small>Dificulty: </small> <small>  {quiz.difficulty} </small> </div>    
              <div className="list-group-item "> <small> Quiz Rating: </small> <small> <Rating name="readOnly" value={quiz.rating} readOnly precision={0.5}/> </small> </div>
              <div className="list-group-item "> <small> Your Rating: </small> <Rating name={waitingOne || waitingTwo || !result ? "disabled" : "simple-controlled"} value={result?.rating && result.rating >= 0 ? result.rating : null} disabled={!result || waitingOne || waitingTwo} onChange={(e, v) => onRatingClick(v)} precision={0.5} /> </div>
            </div> 
          </div>
        </div> 
      </div>  {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
   
  </div>
  )
}

export default QuizResults