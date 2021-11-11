import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import Loading from '../components/Loading';
import { AuthContext } from '../context/auth';
import { FETCH_QUIZZES_QUERY,FETCH_SEARCHRESULTS_QUERY } from '../Calls';
import QuizCard from '../components/QuizCard';
import UserCard from '../components/UserCard';


const QuizScreen = () => {
  const { user } = useContext(AuthContext);
  const [ searchInput, setSearchInput ] = useState("")
  const [value, setValue] = useState("Quiz");
  const [users,setUsers] = useState();
  const [quizzes,setQuizzes] = useState();
  const [categoryQuizzes,setcategoryQuizzes] = useState();
 
  const  userData = useQuery(FETCH_SEARCHRESULTS_QUERY, {
    variables: {  query: searchInput,searchFilter:"User" } 
  });
  const  quizData = useQuery(FETCH_SEARCHRESULTS_QUERY, {
    variables: {  query: searchInput,searchFilter:"Quiz" } 
  });

  const  categoryData = useQuery(FETCH_SEARCHRESULTS_QUERY, {
    variables: { query: searchInput,searchFilter:"Category" }
  });
 
  const handleChange = val => {
    setValue(val.target.value);
    setUsers()
    setQuizzes();
  }
 
  const handleApply=()=>{
    console.log("Apply clicked");
    if(value==="Quiz"){ setQuizzes(quizData.data.getSearchResults) }
    if(value==="User"){ setUsers(userData.data.getSearchResults)   }
    if(value==="Category"){
      setcategoryQuizzes(categoryData.data.getSearchResults)
      //todo
    } 
  }

  
  return (
    <div className="container">
      <h1>Quiz Results</h1>
      <div className="row mt-3 mb-4 py-2">
        <div className="col-6 offset-3">
          <div className="input-group">
            <span className="input-group-text">Search</span>
            <input type="text" className="form-control" placeholder="Type quiz name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
          </div>
        </div> 
      </div>   
      <div> 

        <div onChange={handleChange} style={{float:"left",marginRight:"10px",padding:"20px",border:"solid"}} >
          <h4>Filter By:</h4>
        
          <li style={{listStyle:"none"}}> <input type="radio" value="Quiz" name="option" defaultChecked /> Quiz </li>
          <li style={{listStyle:"none"}}> <input type="radio" value="User" name="option" /> User </li>

          <li style={{listStyle:"none"}}> <input type="radio" value="Category" name="option" /> Category </li>
          <Button onClick={handleApply}> Apply</Button>
        </div>

        <div className = "row-cols-auto" style={{overflow:"auto"}}> 
          {user && quizzes&& value==="Quiz" && quizzes.map((quiz, index) =>
            <div  key={index}>
              <QuizCard quiz={quiz} home={true}/>
            </div>
          )}

          {user && categoryQuizzes && value==="Category" && categoryQuizzes.map((quiz, index) =>
                      <div  key={index}>
                        <QuizCard quiz={quiz} home={true}/>
                      </div>
          )}
        </div>
        
        {/* <div className="row-cols-auto"  style={{overflow:"auto",float:"left"}}> 
          {user && users  && value==="User"&& users.map((currentuser, index) =>
            <div className="col"  key={index}>  
              
          </div>

              
           
          )}
        </div> */}

          <div className="row">
                </div>
                <div className="row row-cols-auto g-3"> 
                {user && users  && value==="User"&& users.map((currentuser, index) =>
                    <div className="col"  key={index}>  
                      <UserCard currentuser={currentuser} />
                    </div>
                  )}
          </div>


      </div> 
    </div>
  )
}

export default QuizScreen
