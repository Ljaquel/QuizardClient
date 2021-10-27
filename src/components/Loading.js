import React from 'react'

const Loading = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-auto">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

  )
}

export default Loading
