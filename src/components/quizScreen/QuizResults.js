import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { useQuery } from '@apollo/client'
import { FETCH_RESULTS_QUERY } from '../../Calls'
import Loading from '../Loading'

const QuizResults = (props) => {
  const { quiz } = props
  const { contextUserId } = useContext(AuthContext)
  const { user } = props

  const { data, loading } = useQuery(FETCH_RESULTS_QUERY, {
    pollInterval: 100,
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { filters: { userId: contextUserId, quizId: quiz._id} }
  })

  const result = data?.getResults[0]

  if(loading || result === undefined) return <Loading />

  return (
    <div className="container-lg py-4">
      <h3>{user.name+", "} You have finished "{quiz?.name}"</h3>
      <h3>Your score was: {result ? result.score : "..."}/100</h3>
      <button className="btn btn-success" onClick={() => props.history.push("/")}>Continue</button>
    </div>
  )
}

export default QuizResults