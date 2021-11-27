import React, { useState } from 'react'
import {Image} from 'cloudinary-react'
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import Loading from '../Loading'
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_RESULT, UPDATE_QUIZ_MUTATION, FETCH_RESULTS_QUERY} from "../../Calls";
import Rating from '@mui/material/Rating';

const QuizHome = ({ quiz, user, setScreen, refetchQuiz }) => {
  const [comment, setComment] = useState("");
  const [waitingOne, setWaitingOne] = useState(false);
  const [waitingTwo, setWaitingTwo] = useState(false);

  const { data, loading, refetchResult } = useQuery(FETCH_RESULTS_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { filters: { userId: user._id, quizId: quiz._id} }
  })

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
    <div className="container-lg pt-2">
      <div className="row mt-2 mb-5">
        <div className="col">
          {quiz.thumbnail?.publicId && <Image cloudName="ljaquel"  width="300" publicId={quiz.thumbnail.publicId}/> } 
        </div>
      </div>
      <div className="row mt-2 mb-5">
        <div className="col">
          <h1>QuizScreen</h1>
        </div>
        <div className="col"></div>
        <div className="col-2 mt-3">
          <button className="btn btn-success" disabled={!user} onClick={() => setScreen(2)}>Take Quiz</button>
        </div>
      </div>
      <h5>Name: {quiz.name}</h5>
      <h5>Description: {quiz.description}</h5>
      <h5>Difficulty: {quiz.difficulty}</h5>
      <h5>Total Questions: {quiz.content.length}</h5>
      <h5>Time Limit: {quiz.time}</h5>
      <h5>Quiz Rating: 
        <Rating name="readOnly" value={quiz.rating} readOnly precision={0.5} />
      </h5>

      <h5>Your Rating: 
        <Rating
          name={waitingOne || waitingTwo || !result ? "disabled" : "simple-controlled"}
          value={result?.rating && result.rating >= 0 ? result.rating : null}
          disabled={!result || waitingOne || waitingTwo}
          onChange={(e, v) => onRatingClick(v)}
          precision={0.5}
        />
      </h5>

      <div className="container-sm bg-secondary rounded p-2 mt-5">
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
  )
}

export default QuizHome