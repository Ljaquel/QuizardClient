import React, { useState } from 'react'
import {Image} from 'cloudinary-react'
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import Loading from '../Loading'
import { BsFillPlayFill } from 'react-icons/bs';
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_RESULT, UPDATE_QUIZ_MUTATION, FETCH_RESULTS_QUERY,FETCH_USER_QUERY,FETCH_SEARCH_RESULTS_QUERY} from "../../Calls";
import Rating from '@mui/material/Rating';

const QuizHome = ({ quiz, user, setScreen, refetchQuiz }) => {
  const [comment, setComment] = useState("");
  const [waitingOne, setWaitingOne] = useState(false);
  const [waitingTwo, setWaitingTwo] = useState(false);

  const { data, loading, refetchResult } = useQuery(FETCH_RESULTS_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { filters: { userId: user._id, quizId: quiz._id} }
  })
  const { data:creatorData, refetch} = useQuery(FETCH_USER_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { userId: quiz?.creator._id }
  })
  const { data: tagsData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { variables: { query: "math", searchFilter:"Tag" } });
  const taggedQuizzes = tagsData?.getSearchResults




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

  if(loading) return <Loading />


  return (
    <div className="container-lg pt-2 d-flex flex-column overflow-hidden">
      
      <div className="row vh-100"> 
        <div className="col-2" style={{backgroundColor:"rgb(234,234,234)" }}>
          <h2 className="rounded-top text-center"  style={{backgroundColor:user.color}}> Similar   </h2>

          
          {quiz.tags[0]}
          {taggedQuizzes && taggedQuizzes?.map((myquiz, index) => <h1> {myquiz.name}  </h1>  )}







        </div>

        <div className="col-8  d-flex flex-column" style={{overflowY: "scroll",height:"90%"}}>
          <div className="  d-flex flex-column" style={{ backgroundImage: `url("${quiz.thumbnail?.url}")`,backgroundPosition:"center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>      
            <div className="me-5 ms-5 mt-5 mb-5 " style={{backgroundColor:"rgba(19, 16, 16, .6)" ,height:"450px",borderRadius:"15px"}}>   
              <h3 className=" text-light text-center mt-lg-5">{quiz.name}</h3>
              <p className="mt-5 mb-5 text-light text-center w-75 ms-auto me-auto">Description: {quiz.description}</p>
              <button className=" btn btn-success d-flex ms-auto me-auto" style={{ color:""}} disabled={!user} onClick={() => setScreen(2)}> <BsFillPlayFill size="50"/> </button>                
            </div>
          </div>

          <div className=" bg-secondary rounded p-2 mt-5">
              <h2>Comments</h2>
                  {quiz.comments && quiz.comments.map((comment) => (
                    <div key={comment._id} className="row rounded px-2 mx-2 mt-1">
                      <div className="col-6 bg-light rounded">
                        <span className="badge bg-primary">{comment.user.username}</span>
                        <span className=""> - <small>{moment(comment.createdAt).fromNow()}</small></span>
                        <p>{comment.body}</p>
                      </div>
                      {comment.user._id === user._id &&
                        <div className="col-1">
                          <button onClick={() => deleteComment({ variables: {commentId: comment._id}})} className="btn btn-danger btn">x</button>
                        </div>
                      }
                    </div>
                  ))}
                  <div className="row mt-5">
                    <div className="col-auto">
                      <input type="text" className="form-control" placeholder="Enter a comment" value={comment} onChange={e => setComment(e.target.value)} />
                    </div>
                    <div className="col-auto">
                      <button onClick={() => createComment({ variables: {body: comment}})} className="btn btn-primary btn-sm">Post</button>
                    </div>
                  </div>
          </div>
    
        </div>

        <div className="col-2 d-flex flex-column" style={{overflowY: "scroll",height:"90%",backgroundColor:"rgb(234,234,234)"}}>
        
       

        
          <h2 className="rounded-top text-center"  style={{backgroundColor:user.color}}> Creator   </h2>
          {creator?.avatar?.publicId? 
            <Image className="rounded-circle d-flex ms-auto me-auto mt-3 mb-3" style={{border:"solid"}} cloudName="ljaquel"  width="100" height="100" crop="fill" radius="max" publicId={creator.avatar.publicId}/> 
            :<img  className=               "d-flex ms-auto me-auto mt-3 mb-3" style={{border:"solid"}} width="100" height="100" src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg" alt="Default Profile"/>          
          } 
          <h5 className="text-center">{quiz.creator.name} </h5> 
          <hr /> 
          <p1 className="rounded-top text-center " style={{backgroundColor:user.color}}>Quiz information </p1> 
          <li className="list-group-item d-flex justify-content-between"> <small>Time: </small> <small>  { quiz.time.substring(3, 5)}mins </small> </li>
          <li className="list-group-item d-flex justify-content-between"> <small>points: </small> <small>  N/A </small> </li>        
          <li className="list-group-item d-flex justify-content-between"> <small>Questions: </small> <small>  {quiz.content.length} </small> </li>
          <li className="list-group-item d-flex justify-content-between"> <small>Dificulty: </small> <small>  {quiz.difficulty} </small> </li>    
          <li className="list-group-item ">  <small> Quiz Rating: </small>  <Rating name="readOnly" value={quiz.rating} readOnly precision={0.5} />
          </li>
          <li className="list-group-item ">
              Your Rating: 
                <Rating
                  name={waitingOne || waitingTwo || !result ? "disabled" : "simple-controlled"}
                  value={result?.rating && result.rating >= 0 ? result.rating : null}
                  disabled={!result || waitingOne || waitingTwo}
                  onChange={(e, v) => onRatingClick(v)}
                  precision={0.5}
                />     
          </li>
           
        </div>
      </div> 
    </div>
  )
}

export default QuizHome