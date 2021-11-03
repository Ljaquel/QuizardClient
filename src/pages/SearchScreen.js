import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';

import SearchQuizCard from '../components/SearchQuizCard';
import Loading from '../components/Loading';
import { AuthContext } from '../context/auth';
import { FETCH_QUIZZES_QUERY } from '../Calls';

const QuizScreen = () => {
  const { user } = useContext(AuthContext);
  const { data, refetch } = useQuery(FETCH_QUIZZES_QUERY);

  useEffect(() => {
    refetch()
  }, [refetch]);

  if(!data) { return <Loading/> }
  const { getQuizzes: quizzes } = data;
 
  return (
    <div className="container">
      <div >
        <h1  >Search</h1>
      </div>

      <div> 
        {user && quizzes && quizzes.map((quiz, index) =>
          <div  key={index}>  
            <SearchQuizCard quiz={quiz} home={true}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizScreen
