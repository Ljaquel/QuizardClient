import React, { useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client';

import QuizCard from '../components/QuizCard';
import Loading from '../components/Loading';
import { AuthContext } from '../context/auth';

import CreateQuizPopUp from '../components/CreateQuizPopUp';



import { CREATE_QUIZ, FETCH_QUIZZES_QUERY } from '../Calls';

const Home = () => {
  const { user } = useContext(AuthContext);


  const { data, refetch } = useQuery(FETCH_QUIZZES_QUERY);

  if(!data) { return <Loading/> }
  const { getQuizzes: quizzes } = data;

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1 className="mt-3 mb-4 col-3">Quizard</h1>
          <div className="col">
          </div>
          <div className="col-2">
            {user &&  <CreateQuizPopUp/> }
          </div>
        </div>
        
        <div className="row row-cols-auto g-3">
        {console.log(quizzes)}
          {user && quizzes && quizzes.map((quiz, index) => <div className="col"  key={index} >  
                        <QuizCard quiz={quiz}/>  </div>)}
        </div>
      </div>
    </div>
  )
  
}

export default Home;