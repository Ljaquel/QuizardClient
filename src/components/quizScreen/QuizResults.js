import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'

const QuizResults = ({ quiz }) => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div>
      {user?.name}, you finished {quiz?.name}
    </div>
  )
}

export default QuizResults