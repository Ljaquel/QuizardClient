import React, {useContext} from 'react';
//import { useHistory } from 'react-router'; 
import { AuthContext } from '../context/auth';
//import { Link } from "react-router-dom";
import '../styles/QuizCard.css' 

function UserCard(props) {
  const { currentuser } = props;
  const { user } = useContext(AuthContext); 
  // const destination =  "/guestprofile/"
  // const history= useHistory();
  console.log(user)
  return (
    <div> 
      {/* <Link to={`${destination}${currentuser._id}`} className="searchScreencardDiv card-subtitle text-muted" > */}
        <div className="searchScreencardDiv card-subtitle text-muted" >
          <div style={{width: "15rem",height:"134px", border:"solid", padding:"16px",marginBottom:"10px"}}>                
                <h5>Name: {currentuser.name}  </h5>                
                <p className="card-text" style={{fontSize: "13px"}}>Username:{currentuser.username}</p>
                {/* {currentuser._id} */}
                
          </div>
        </div>

      {/* </Link>  */} 
    </div> 
  )
}

export default UserCard;