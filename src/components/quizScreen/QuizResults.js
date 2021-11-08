import React from 'react'

const QuizResults = ({ quiz }) => {
  return (
    <div>
      You finished {quiz?.name}
    </div>
  )
}

export default QuizResults