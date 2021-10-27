import React from 'react'

const Description = ({ description }) => {
  return (
    <div className="container-xxl bg-light">
      <h6>Description:</h6>
      <h6> { description === "" ? "Description" : description } </h6>
    </div>
  )
}

export default Description
