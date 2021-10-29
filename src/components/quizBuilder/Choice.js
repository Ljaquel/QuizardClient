import React from 'react'

const Choice = ({choice, isAnswer}) => {
  return (
    <div className={isAnswer ? "text-primary" : ""}>
      {choice}
    </div>
  )
}

export default Choice;