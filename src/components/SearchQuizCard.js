import React, {useContext} from 'react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import { Link } from "react-router-dom";
import '../styles/SearchQuizCard.css'


function SearchQuizCard(props) {
  const { quiz } = props;
  const { user } = useContext(AuthContext);
  const destination = user?._id === quiz.creator ? "/quizbuilder/" : "/quizscreen/"

  return (
    <div className="card" >

      <Link to={`${destination}${quiz._id}`} className="card-subtitle text-muted">
        <div className="card-body">
          
            {quiz.name}
          
          

          <p className="card-text" style={{fontSize: "13px"}}>
            {quiz.description.length < 70 ? quiz.description : "Description..."}
          </p>
          <h6 className="card-subtitle text-muted mt-0">
            {props.home && quiz?.creator === user?._id && "Owner - "}{moment(quiz.createdAt).fromNow()}
          </h6>
        </div>
      </Link>




    </div>
  )
}

export default SearchQuizCard;