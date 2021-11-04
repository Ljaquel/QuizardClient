import React, {useContext} from 'react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import { Link } from "react-router-dom";

function QuizCard(props) {
  const { quiz } = props;
  const { user } = useContext(AuthContext);
  const destination = quiz.published ? "/quizscreen/" : user?._id === quiz.creator ? "/quizbuilder/" :  "/quizscreen/"

  return (
    <div className="card" style={{width: "15rem"}}>
      <div className="card-body">
        <Link to={`${destination}${quiz._id}`} className="card-subtitle text-muted">{quiz.name}</Link>
        <p className="card-text" style={{fontSize: "13px"}}>{quiz.description.length < 70 ? quiz.description : "Description..."}</p>
        <h6 className="card-subtitle text-muted mt-0">
          {props.home && quiz?.creator === user?._id && "Owner - "}{quiz.publishedDate.length>0?"Published "+moment(quiz.publishedDate).fromNow():"Created "+moment(quiz.createdAt).fromNow()}
        </h6>
      </div>
    </div>
  )
}

export default QuizCard;