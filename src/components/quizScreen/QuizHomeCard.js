import React, {useContext} from 'react';
import moment from 'moment';
import { AuthContext } from '../../context/auth'

const QuizHomeCard = ({ quiz, home, history}) => { 
  const destination = "/quizscreen/" 

  return (
    <div className="card platform-card rounded w-100" style={{width: '13rem'}} onClick={() => history.push(`${destination}${quiz._id}`)}> 
    <img className="card-img-top p-1 limit-image-height" src={quiz?.thumbnail?.url? quiz.thumbnail.url: "https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png"} alt="..."/>
    <div className="col-7">
      <div className="card-body">
        <h5 className="card-title">{quiz.name}</h5> 
        <p className="card-text"><small className="text-muted">{quiz.publishedDate.length>0?"Published "+moment(quiz.publishedDate).fromNow():"Created "+moment(quiz.createdAt).fromNow()}</small></p>
      </div>
    </div> 
    </div>
  )


}

export default QuizHomeCard
