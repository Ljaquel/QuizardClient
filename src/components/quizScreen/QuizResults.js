import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'

const QuizResults = (props) => {
  const { quiz } = props
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div className="container-lg py-4">
      <h3>{user.name? user.name + ", " : ""} You have finished "{quiz?.name}"</h3>
      <h3>Your score was: {user.history[0].score}/100</h3>
      <button className="btn btn-success" onClick={() => props.history.push("/")}>Continue</button>
    </div>
  )
}

export default QuizResults