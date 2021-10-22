import React, {useContext} from 'react';
import moment from 'moment';
import { AuthContext } from '../context/auth';

function QuizCard(props) {
  const { quiz } = props;
  const { user } = useContext(AuthContext);

  return (
    <div className="card m-2 p-1" style={{width: "15rem"}}>
      <div className="card-body">
        <h6 className="card-subtitle text-muted">{quiz.name}</h6>
        <h6 className="col card-subtitle text-muted">{moment(quiz.createdAt).fromNow()}</h6>
        <p className="card-text mt-4">{user.name}</p>
      </div>
    </div>
  )
}

export default QuizCard;