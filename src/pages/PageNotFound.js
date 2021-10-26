import React from 'react'
import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <>
      <h2> 404 ERROR! </h2>
      <Link to="/">Home</Link>
    </>
  )
}

export default PageNotFound
