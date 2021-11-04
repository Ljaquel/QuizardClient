import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';

import SearchQuizCard from '../components/SearchQuizCard';
import Loading from '../components/Loading';
import { AuthContext } from '../context/auth';
import { FETCH_QUIZZES_QUERY } from '../Calls';

const QuizScreen = () => {
  const { user } = useContext(AuthContext);
  const [ searchInput, setSearchInput ] = useState("")

  const { data, refetch } = useQuery(FETCH_QUIZZES_QUERY, {
    variables: { filters: { published: true } }
  });

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
      <div className="row row-cols-auto g-3"> 
        {user && quizzes && searchInput !== "" && quizzes.map((quiz, index) =>
          <div className="col"  key={index}>
            <SearchQuizCard quiz={quiz} home={true}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizScreen
