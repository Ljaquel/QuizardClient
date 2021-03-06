import React from 'react';

const QuizHomeCard = ({ quiz, home, history}) => { 
  const destination = "/quizscreen/" 

  return (
    //<div className="card platform-card rounded w-100" onClick={() => history.push(`${destination}${quiz._id}`)}> 
    //  <img className="card-img-left p-1 limit-image-height w-50" src={quiz?.thumbnail?.url? quiz.thumbnail.url: "https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png"} alt="..."/>
    //  <div className="col">
    //    <div className="card-body">
    //      <h5 className="card-title">{quiz.name}</h5> 
    //      <p className="card-text"><small className="text-muted">{quiz.publishedDate.length>0?"Published "+moment(quiz.publishedDate).fromNow():"Created "+moment(quiz.createdAt).fromNow()}</small></p>
    //    </div>
    //  </div> 
    //</div>
    <div className="card platform-card rounded w-100 mb-1" onClick={() => history.push(`${destination}${quiz._id}`)}>
      <div className="row g-0">
        <div className="col-5 p-1">
          <img className="img-fluid rounded-start" src={quiz?.thumbnail?.url? quiz.thumbnail.url: "https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png"} alt="..."/>
        </div>
        <div className="col-7">
          <div className="card-body">
            <h6 className="card-title">{quiz.name}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizHomeCard
