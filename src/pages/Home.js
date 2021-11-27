import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client';

import QuizCard from '../components/QuizCard';
import Loading from '../components/Loading';
import { AuthContext } from '../context/auth';
import { FETCH_QUIZZES_QUERY } from '../Calls';

const Home = (props) => {
  const { contextUserId } = useContext(AuthContext);
  const { data, refetch } = useQuery(FETCH_QUIZZES_QUERY, {
    variables: {filters: { published: true }}
  });

  useEffect(() => {
    refetch()
  }, [refetch]);

  if(!data) { return <Loading/> }
  const { getQuizzes: quizzes } = data;

  return (
    <div className="container">
      <div className="row">
        <h1 className="mt-3 mb-4 col-3">Quizard</h1>
      </div>
      <div className="row row-cols-auto g-3"> 
        {contextUserId && quizzes && quizzes.map((quiz, index) =>
          <div className="col"  key={index}>  
            <QuizCard quiz={quiz} home={true} history={props.history}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;