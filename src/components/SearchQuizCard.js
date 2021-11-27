import React, {useContext} from 'react';
import moment from 'moment';
import { AuthContext } from '../context/auth';

const SearchQuizCard = ({ quiz, home, history}) => {
  const { contextUserId } = useContext(AuthContext);
  const destination = home ? "/quizscreen/" : contextUserId === quiz.creator._id ? "/quizbuilder/" :  "/quizscreen/"

  return (
    <div className="card mb-3 search-quiz-card rounded w'100" onClick={() => history.push(`${destination}${quiz._id}`)}>
      <div className="row g-0">
        <div className="col-5 ps-1 pt-1">
          <img src={quiz?.thumbnail?.url?quiz.thumbnail.url:"https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png"} className="img-thumbnail" style={{padding: '0.10rem', backgroundColor: '#fff'}} alt="..."/>
        </div>
        <div className="col-7">
          <div className="card-body">
            <h5 className="card-title">{quiz.name}</h5>
            <p className="card-text">{quiz.description.length < 80 ? quiz.description : quiz.description.substring(0, 80)+"..."}</p>
            <p className="card-text"><small className="text-muted">{quiz.publishedDate.length>0?"Published "+moment(quiz.publishedDate).fromNow():"Created "+moment(quiz.createdAt).fromNow()}</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchQuizCard
