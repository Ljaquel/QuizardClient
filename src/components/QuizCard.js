import React, {useContext} from 'react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import { Link } from "react-router-dom";

function QuizCard(props) {
  const { quiz } = props;
  const { user } = useContext(AuthContext);

  return (
    <div className="card" style={{width: "15rem"}}>
      <div className="card-body">
        <Link to={`/quizbuilder/${quiz._id}`} className="card-subtitle text-muted">{quiz.name}</Link>
        <p className="card-text">{quiz.description}</p>
        <h6 className="col card-subtitle text-muted mt-4">{moment(quiz.createdAt).fromNow()}</h6>
      </div>
    </div>
  )
}

export default QuizCard;