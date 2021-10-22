import React, { useContext, useState } from 'react'
import QuizCard from '../components/QuizCard';
import { AuthContext } from '../context/auth';
import { gql, useQuery, useMutation } from '@apollo/client';

const Home = () => {
  const { user } = useContext(AuthContext);
  
  const [addQuiz] = useMutation(CREATE_QUIZ, {
    variables: { name: "Quiz Name", creator: user?user.id:"" },
    update(proxy, result){
      proxy.writeQuery({
        query: FETCH_QUIZZES_QUERY,
        data: {
          getQuizzes: [result.data.createQuiz, ...data.getQuizzes]
        }
      })
    }
  });

  const { data } = useQuery(FETCH_QUIZZES_QUERY);
  if(!data) { return <div></div> }
  const { getQuizzes: quizzes } = data;

  const onCreate = () => {
    addQuiz()
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1 className="mt-3 mb-4 col-3">Quizard</h1>
          <div className="col">
          </div>
          <div className="col-2">
            {user &&
            <button type="button" className="btn btn-info btn-lg mt-3" onClick={onCreate}>
              Create Quiz
            </button>
            }
          </div>
        </div>
        <div className="row">
          {user && quizzes && quizzes.map((quiz, index) => <QuizCard key={index} quiz={quiz}/>)}
        </div>
      </div>
    </div>
  )
}

const FETCH_QUIZZES_QUERY = gql`
  {
    getQuizzes {
      name
      creator
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
export default Home;