import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import '../styles/QuizCard.css' 

function UserCard(props) {
  const { currentuser } = props;
  const { user } = useContext(AuthContext); 
  const destination =  "/profile/"
  

  return (
    <div> 
      <Link to={`${destination}${currentuser._id}`} className="searchScreencardDiv card-subtitle text-muted" >
        <div className="searchScreencardDiv card-subtitle text-muted" >
          <div style={{width: "15rem",height:"134px", border:"solid", padding:"16px",marginBottom:"10px"}}>                
                <h5>Name: {currentuser.name}  </h5>                
                <p className="card-text" style={{fontSize: "13px"}}>Username:{currentuser.username}</p>                
                
          </div>
        </div>

      </Link>  
    </div> 
  )
}

export default UserCard;