import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import Loading from '../components/Loading';
import { AuthContext } from '../context/auth';
import { FETCH_QUIZZES_QUERY } from '../Calls';
import QuizCard from '../components/QuizCard';
import { Button } from 'react-bootstrap';


const QuizScreen = () => {
  const { user } = useContext(AuthContext);
  const [ searchInput, setSearchInput ] = useState("")

  const { data, refetch } = useQuery(FETCH_QUIZZES_QUERY, {
    variables: { filters: { published: true } }
  });

  const [value, setValue] = useState(2);
  const handleChange = val => setValue(val);

  useEffect(() => {
    refetch()
  }, [refetch]);

  if(!data) { return <Loading/> }
  let { getQuizzes: quizzes } = data;

  if(quizzes && searchInput !== "") quizzes = quizzes.filter(q => q.name.toLowerCase().includes(searchInput)); 
  return (
    <div className="container">
      <h1>Quiz Results</h1>
      <div className="row mt-3 mb-4 py-2">
        <div className="col-6 offset-3">
          <div className="input-group">
            <span className="input-group-text">Search</span>
            <input type="text" className="form-control" placeholder="Type quiz name" value={searchInput} onChange={(e) => setSearchInput(e.target.value.toLowerCase())}/>
          </div>
        </div> 
      </div>   
      <div> 
        <div onChange={handleChange} style={{float:"left",marginRight:"10px",padding:"20px",border:"solid"}} >
          <h4>Filter By:</h4>
        
          <li style={{listStyle:"none"}}> <input type="radio" value="Quiz" name="option" defaultChecked /> Quiz </li>
          <li style={{listStyle:"none"}}> <input type="radio" value="User" name="option" /> User </li>

          <li style={{listStyle:"none"}}> <input type="radio" value="Category" name="option" /> Category </li>
          <Button onClick={()=>{console.log(value.target.value)}}> Apply</Button>
        </div>

        <div style={{overflow:"auto"}}> 
          {user && quizzes && searchInput !== "" && quizzes.map((quiz, index) =>
            <div  key={index}>
              <QuizCard quiz={quiz} home={true}/>
            </div>
          )}
        </div>
      </div> 
    </div>
  )
}

export default QuizScreen
