import React, {useContext} from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import { Link } from "react-router-dom";
import '../styles/QuizCard.css'
import {Image} from 'cloudinary-react'

function QuizCard({ quiz, home}) {
  const { contextUserId } = useContext(AuthContext);
  const destination = home ? "/quizscreen/" : contextUserId === quiz.creator._id ? "/quizbuilder/" :  "/quizscreen/"
  const path = useHistory().location.pathname;

  return (
    <Link to={`${destination}${quiz._id}`} className="searchScreencardDiv card-subtitle text-muted" >
      {(path==="/" || path.includes("/platform")) &&
        <div className="p-2 border border-3 border-secondary rounded ">
          <Image cloudName="ljaquel"  width="100" publicId={quiz.thumbnail.publicId} className='me-2'/>
          <span>{quiz.name}</span> 
          <p className="card-text" style={{fontSize: "13px"}}>{quiz.description.length < 70 ? quiz.description : "Description..."}</p>
          <h6 className="card-subtitle mt-0">
            {quiz.publishedDate.length>0?"Published "+moment(quiz.publishedDate).fromNow():"Created "+moment(quiz.createdAt).fromNow()}
          </h6>
        </div>
      }
      {path === "/searchscreen" &&
        <div className="p-3 mb-3 w-100 border border-3 border-secondary rounded">
          <Image cloudName="ljaquel"  width="100" publicId={quiz.thumbnail.publicId} className='me-2'/>
          <span>{quiz.name}</span> 
          <p className="card-text" style={{fontSize: "13px"}}>{quiz.description.length < 140 ? quiz.description : "Description..."}</p>
          <p>Tags: {quiz?.tags.toString()}</p> 
          <h6 className="card-subtitle mt-0">
            {quiz.publishedDate.length>0?"Published "+moment(quiz.publishedDate).fromNow():"Created "+moment(quiz.createdAt).fromNow()}
          </h6>
        </div>
      }
    </Link> 
  )
}

export default QuizCard;