import React from 'react'
import { Link } from "react-router-dom"

function PageNotFound(props) {
  const { message } = props;
  return (
    <div className="container-sm">
      <div className="row justify-content-center">
        <div className="col-auto text-danger"> <h2>{message ? message : "404 ERROR" }</h2> </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto"> <Link to="/">Home</Link> </div>
      </div>
    </div>
  )
}

export default PageNotFound
