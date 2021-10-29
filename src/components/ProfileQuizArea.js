import React, { useContext } from 'react'
import QuizCard from './QuizCard';
import Loading from './Loading';
import { AuthContext } from '../context/auth';
import { gql, useQuery, useMutation } from '@apollo/client';

const ProfileQuizArea = () => {
  const { user } = useContext(AuthContext);
  


  const { data } = useQuery(FETCH_QUIZZES_QUERY);
  if(!data) { return <Loading/> }

  
  const { getQuizzes: quizzes } = data;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-2">
           
          </div>

        </div>
        <div className="row row-cols-auto g-3">
          {quizzes && quizzes.map((quiz, index) =>
           <div className="col"  key={index} > 
             <QuizCard quiz={quiz}/>  </div>)}


        </div>
      </div>
    </div>
  )
}

const FETCH_QUIZZES_QUERY = gql`
  {
    getQuizzes {
      _id
      name
      description
      publishedDate
      published
      creator
      time
      difficulty
      createdAt
    }
  }
`;

const CREATE_QUIZ = gql`
  mutation createQuiz($name: String!, $creator: String!){
    createQuiz(name: $name, creator: $creator) {
      name
      creator
    }
  }
`
export default ProfileQuizArea;