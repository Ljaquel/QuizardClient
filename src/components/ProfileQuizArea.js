import React, { useContext } from 'react'
import QuizCard from './QuizCard';
import Loading from './Loading';
import { AuthContext } from '../context/auth';
import { gql, useQuery, useMutation } from '@apollo/client';

const ProfileQuizArea = () => {
  const { user } = useContext(AuthContext);
  const userid= user._id;
  const mycreatorID="61720a8d816227536fb334c1"


  const {data } = useQuery(FETCH_QUIZ_QUERY3,
      {variables:{creatorID: mycreatorID}} );
      
  if(!data) { return <Loading/> }

  
 

  const FETCH_QUIZZES_QUERY2 = gql`
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

const { getQuizzes: quizzes } = data;
  return (
      
    <div>
      <div className="container">
        <div className="row">
          <div className="mcol">
          </div>
          <div className="mcol-2">
          {console.log(data)}
          {console.log(quizzes)}

          </div>
        </div>
        <div className="row row-cols-auto g-3">
          {data.getQuizzesbyUserid && data.getQuizzesbyUserid.map((quiz, index) =>
           <div className="mcol"  key={index} > 
 
             <QuizCard quiz={quiz}/>  </div>)}


        </div>
      </div>
    </div>
  )
}




const FETCH_QUIZ_QUERY3 = gql`
      query Query($creatorID: String!) {
      getQuizzesbyUserid(creatorID: $creatorID) {
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