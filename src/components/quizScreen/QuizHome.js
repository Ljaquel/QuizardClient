import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import Loading from '../Loading'
import { BsFillPlayFill } from 'react-icons/bs';
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_RESULT, UPDATE_QUIZ_MUTATION, FETCH_RESULTS_QUERY,FETCH_USER_QUERY,FETCH_SEARCH_RESULTS_QUERY} from "../../Calls";
import Rating from '@mui/material/Rating';

const QuizHome = ({ quiz, user, setScreen, refetchQuiz, history }) => {
  const [comment, setComment] = useState("");
  const [waitingOne, setWaitingOne] = useState(false);
  const [waitingTwo, setWaitingTwo] = useState(false);

  const { data, loading, refetchResult } = useQuery(FETCH_RESULTS_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { filters: { userId: user._id, quizId: quiz._id} }
  })
  const { data:creatorData } = useQuery(FETCH_USER_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { userId: quiz?.creator._id }
  })
  // const { data: tagsData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { variables: { query: "math", searchFilter:"Tag" } });
  // const taggedQuizzes = tagsData?.getSearchResults

  const creator = creatorData?.getUser
  const result = data?.getResults[0]

  const [updateRating] = useMutation(UPDATE_RESULT, {
    onCompleted() { refetchResult(); setWaitingOne(false) },
    onError(err) { console.log(JSON.stringify(err, null, 2)); setWaitingOne(false) },
  });

  const [updateQuiz] = useMutation(UPDATE_QUIZ_MUTATION, {
    onCompleted() { refetchQuiz(); setWaitingTwo(false); console.log('success') },
    onError(err) { console.log(JSON.stringify(err, null, 2)); setWaitingTwo(false) },
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
    updateQuiz({variables: {quizId: quiz._id, update: {rating: newRating, ratingCount: result.rating===-1?quiz.ratingCount+1:quiz.ratingCount} }})
    updateRating({ variables: {resultId: result._id, update: {rating: v}}})
  }

  const bProps = { backgroundSize: 'cover', backgroundPosition: 'center'}

  const goToC = () => { history.push(`/profile/${creator._id}`) }

  if(loading || !creator) return <Loading />


  return (
    <div className="container-fluid d-flex flex-column overflow-auto">
      
      <div className="row vh-100 px-1"> 
        <div className="col-2 px-0 rounded-top border border-1">
          <h2 className="rounded-top text-center"  style={{backgroundColor:creator.color}}> Similar </h2>
          {/* {quiz.tags[0]}
          {taggedQuizzes && taggedQuizzes?.map((myquiz, index) => <h1> {myquiz.name}  </h1>  )} */}
        </div>

        <div className="col-8 d-flex flex-column px-1">
          <div className="d-flex flex-column rounded-top" style={{position: 'relative', height:"500px", backgroundImage: `url("${quiz.thumbnail?.url}")`, backgroundPosition:"center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>      
            <div className="bg-dark rounded w-100 pt-1 pb-2" style={{opacity: "0.85", position: 'absolute', bottom: '0px'}}>   
              <h3 className="text-light text-center">{quiz.name}</h3>
              <p className="text-light text-center mx-auto px-3">{quiz.description}</p>
              <div className="row p-0 m-0 justify-content-center">
                <button className="btn col-auto" style={{backgroundColor: creator.color, opacity: "1", width: '200px', height: '70px'}} disabled={!user} onClick={() => setScreen(2)}> <BsFillPlayFill size="50"/> </button>          
              </div>
            </div>
          </div>

          <div className="row pt-2 px-2 m-0">
            <div className="row pt-2 px-0">
              <h5>Comments</h5>
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
            <div className="row pt-2 px-0">
              <div className="col-auto">
                <input type="text" className="form-control" placeholder="Enter a comment" value={comment} onChange={e => setComment(e.target.value)} />
              </div>
              <div className="col-auto">
                <button onClick={() => createComment({ variables: {body: comment}})} className="btn btn-primary btn-sm">Post</button>
              </div>
            </div>
          </div>    
        </div>

        <div className="col-2 d-flex flex-column pt-1 px-1" style={{overflow: "auto"}}>      
        
          <div className="border border-1 rounded-top mb-2 pointer card-hover" onClick={goToC}>
            <h4 className="rounded-top text-center py-1" style={{backgroundColor:creator.color}}>Creator</h4>
            <div className="mx-auto my-2 rounded-circle border border-2" style={{width: '130px', height: '130px', ...bProps, backgroundImage: `url(${creator?.avatar?.url ? creator?.avatar?.url : `https://res.cloudinary.com/ljaquel/image/upload/v1637536528/admin/profile_uvnezs.png`})`}}/>     
            <h5 className="text-center">{quiz.creator.name} </h5> 
          </div>
          
          <div className="rounded-top mb-2">
            <h4 className="rounded-top text-center py-1 m-0" style={{backgroundColor:creator.color}}>Quiz Information </h4> 
            <div className="list-group-item d-flex justify-content-between"> <small>Time: </small> <small>  { quiz.time.substring(3, 5)} mins </small> </div>
            <div className="list-group-item d-flex justify-content-between"> <small>points: </small> <small> 100 </small> </div>        
            <div className="list-group-item d-flex justify-content-between"> <small>Questions: </small> <small>  {quiz.content.length} </small> </div>
            <div className="list-group-item d-flex justify-content-between"> <small>Dificulty: </small> <small>  {quiz.difficulty} </small> </div>    
            <div className="list-group-item "> <small> Quiz Rating: </small> <small> <Rating name="readOnly" value={quiz.rating} readOnly precision={0.5}/> </small> </div>
            <div className="list-group-item "> <small> Your Rating: </small> <Rating name={waitingOne || waitingTwo || !result ? "disabled" : "simple-controlled"} value={result?.rating && result.rating >= 0 ? result.rating : null} disabled={!result || waitingOne || waitingTwo} onChange={(e, v) => onRatingClick(v)} precision={0.5} /> </div>
          </div>
          
          <div className="rounded-top">
            <h4 className="rounded-top text-center py-1 m-0" style={{backgroundColor:creator.color}}>Result</h4>
            {result ?
              <>
                <div className="list-group-item d-flex justify-content-between"> <small>Last Score: </small> <small>  {result.last}  </small> </div>
                <div className="list-group-item d-flex justify-content-between"> <small>Highest Score: </small> <small> { result.score }</small> </div>
                <div className="list-group-item d-flex justify-content-between"> <small>Last Taken: </small> <small> { moment(result.modifiedAt).fromNow() }</small> </div>
                <div className="list-group-item d-flex justify-content-between"> <small>First Taken: </small> <small> { moment(result.createdAt).fromNow() }</small> </div>
              </>
              :
              <div className="list-group-item d-flex justify-content-between"> <small>Not taken yet</small> <small> N/A </small> </div>
            }
            </div>

        </div>
      </div> 
    </div>
  )
}

export default QuizHome