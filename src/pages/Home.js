import React, { useContext } from 'react'
import QuizCard from '../components/QuizCard';
import Loading from '../components/Loading';
import { AuthContext } from '../context/auth';
import { gql, useQuery, useMutation } from '@apollo/client';

const Home = () => {
  const { user } = useContext(AuthContext);
  
  const [addQuiz] = useMutation(CREATE_QUIZ, {
    variables: { name: "Quiz Name", creator: user?._id },
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
  if(!data) { return <Loading/> }
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
        <div className="row row-cols-auto g-3">
          {user && quizzes && quizzes.map((quiz, index) => <div className="col"  key={index} >  <QuizCard quiz={quiz}/>  </div>)}
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
export default Home;