import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { useQuery } from '@apollo/client'
import { FETCH_RESULTS_QUERY } from '../../Calls'
import Loading from '../Loading'
import QuestionResult from '../quizResults/QuestionResult'

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
      <div className="row">
        <div className="col"></div>
        <div className="col col-8 rounded results-card px-5 pt-4 pb-3">
          <div className="row">
            <div className="col">
              <h4>Congrats {user.name}!</h4>
              <h4> You have finished '{quiz?.name}'</h4>
              <h4><span className="badge bg-success"> Score: {result ? result.last : "..."}/100</span></h4>
              {result && result.score > result.last && <h5 className="ps-1">Highest: {result.score}</h5>}
            </div>
            {quiz?.thumbnail.publicId !== "" &&
              <div className="col-5">
                <img src={`${quiz.thumbnail.url}`} className="img-thumbnail" alt="..."/>
              </div>
            }
          </div>
          <div className="row pt-4">
            <div className="col"></div>
            <div className="col-auto">
              <button className="btn btn-success" onClick={() => props.history.push("/")}>Continue</button>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-3">
        <div className="col"></div>
        <div className="col col-8 rounded results-card p-5">
          {
            quiz && result && quiz.content.map((q, i) =>
              <QuestionResult key={i} question={q} chosen={result.lastRecord[i]} correct={q.answer} i={i} last={i===quiz.content.length-1}/>
            )
          }
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}

export default QuizResults