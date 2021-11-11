import React, {useContext} from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import { Link } from "react-router-dom";
import '../styles/QuizCard.css' 

function QuizCard(props) {
  const { quiz } = props;
  const { user } = useContext(AuthContext);
  const destination = quiz.published ? "/quizscreen/" : user?._id === quiz.creator ? "/quizbuilder/" :  "/quizscreen/"
  const history= useHistory();

  return (
    <div> 
      {history.location.pathname ==="/" &&
        <Link to={`${destination}${quiz._id}`} className="searchScreencardDiv card-subtitle text-muted" >
        <div style={{width: "15rem",height:"134px", border:"solid", padding:"16px",marginBottom:"10px"}}>
            
              {quiz.name} 
              <p className="card-text" style={{fontSize: "13px"}}>{quiz.description.length < 70 ? quiz.description : "Description..."}</p>
              <h6 className="card-subtitle mt-0">
                {props.home && quiz?.creator === user?._id && "Owner - "}{quiz.publishedDate.length>0?"Published "+moment(quiz.publishedDate).fromNow():"Created "+moment(quiz.createdAt).fromNow()}
              </h6>
          
        </div>
      </Link> 
      }
      {history.location.pathname ==="/searchscreen" &&
      <Link to={`${destination}${quiz._id}`} className="searchScreencardDiv card-subtitle text-muted" >
        <div style={{width: "100%", border:"solid", padding:"16px",marginBottom:"10px"}}>
            
              {quiz.name} 
              <p className="card-text" style={{fontSize: "13px"}}>{quiz.description.length < 140 ? quiz.description : "Description..."}</p>
              <p>category:  {quiz?.tags.toString()}</p> 
              <h6 className="card-subtitle mt-0">
                {props.home && quiz?.creator === user?._id && "Owner - "}{quiz.publishedDate.length>0?"Published "+moment(quiz.publishedDate).fromNow():"Created "+moment(quiz.createdAt).fromNow()}
              </h6>

        </div>
      </Link> 
      }

      {history.location.pathname ==="/profile" &&
        <Link to={`${destination}${quiz._id}`} className="searchScreencardDiv card-subtitle text-muted" >
        <div style={{width: "100%", border:"solid", padding:"16px",marginBottom:"10px"}}>
            
              {quiz.name} 
              <p className="card-text" style={{fontSize: "13px"}}>{quiz.description.length < 70 ? quiz.description : "Description..."}</p>
              <h6 className="card-subtitle mt-0">
                {props.home && quiz?.creator === user?._id && "Owner - "}{quiz.publishedDate.length>0?"Published "+moment(quiz.publishedDate).fromNow():"Created "+moment(quiz.createdAt).fromNow()}
              </h6>
            
        </div>
      </Link> 
      }

    </div> 
  )
}

export default QuizCard;