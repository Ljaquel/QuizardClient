import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import { FETCH_SEARCH_RESULTS_QUERY } from '../Calls';
import QuizCard from '../components/QuizCard';
import UserCard from '../components/UserCard';

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState("")
  const [value, setValue] = useState("Quiz");
 
  const { data: usersData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { variables: {  query: searchInput, searchFilter:"User" } });
  const { data: quizzesData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { variables: {  query: searchInput, searchFilter:"Quiz" } });
  const { data: tagsData } = useQuery(FETCH_SEARCH_RESULTS_QUERY, { variables: { query: searchInput, searchFilter:"Tag" } });

  const users = usersData?.getSearchResults
  const quizzes = quizzesData?.getSearchResults
  const taggedQuizzes = tagsData?.getSearchResults
 
  const searchNotEmpty = searchInput !== ""

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
        <div onChange={ e => setValue(e.target.value) } className="me-3 p-4 border border-3 border-secondary rounded" style={{float:"left"}} >
          <h4>Filter By:</h4>
          <li style={{listStyle:"none"}}> <input type="radio" value="Quiz" name="option" defaultChecked /> Quiz </li>
          <li style={{listStyle:"none"}}> <input type="radio" value="User" name="option" /> User </li>
          <li style={{listStyle:"none"}}> <input type="radio" value="Tag" name="option" /> Tag </li>
        </div>

        <div className = "row-cols-auto" style={{overflow:"auto"}}> 
          {searchNotEmpty && value==="Quiz" && quizzes && quizzes?.map((quiz, index) => <QuizCard key={index} quiz={quiz} home={true}/> )}
          {searchNotEmpty && value==="Tag" && taggedQuizzes && taggedQuizzes?.map((quiz, index) => <QuizCard key={index} quiz={quiz} home={true}/> )}
        </div>
        <div className="row row-cols-auto g-3"> 
          {searchNotEmpty && value==="User" && users && users.map((currentUser, index) =>
            <div className="col"  key={index}>  
              <UserCard currentUser={currentUser} />
            </div>
          )}
        </div>
      </div> 
    </div>
  )
}

export default SearchScreen