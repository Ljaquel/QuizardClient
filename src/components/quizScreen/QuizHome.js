import React, { useState } from 'react'
import {Image} from 'cloudinary-react'
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { CREATE_COMMENT, DELETE_COMMENT } from "../../Calls";

const QuizHome = ({ quiz, user, setScreen, refetchQuiz }) => {
  const [comment, setComment] = useState("");

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

  return (
    <div className="container-lg pt-2">
      <div className="row mt-2 mb-5">
        <div className="col">
          {user?.avatar && <Image cloudName="ljaquel"  width="300" publicId={quiz.thumbnail}/> } 
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