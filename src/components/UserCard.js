import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/QuizCard.css' 

function UserCard(props) {
  const { currentUser } = props;
  const destination =  "/profile/"

  return (
    <div> 
      <Link to={`${destination}${currentUser?._id}`} className="searchScreencardDiv card-subtitle text-muted" >
        <div className="searchScreencardDiv card-subtitle text-muted" >
          <div style={{width: "15rem",height:"134px", border:"solid", padding:"16px",marginBottom:"10px"}}>                
            <h5>Name: {currentUser?.name}  </h5>                
            <p className="card-text" style={{fontSize: "13px"}}>Username:{currentUser?.username}</p>
          </div>
        </div>
      </Link>  
    </div> 
  )
}

export default UserCard;