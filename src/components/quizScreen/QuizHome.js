import React from 'react'
import {Image} from 'cloudinary-react'

const QuizHome = ({ quiz, user, setScreen }) => {
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
    </div>
  )
}

export default QuizHome