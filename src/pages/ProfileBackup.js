import React, { useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import ProfileBanner from '../components/ProfileBanner'
import QuizCard from '../components/QuizCard'
import Loading from '../components/Loading'
import PageNotFound from '../pages/PageNotFound'
import { CREATE_QUIZ, FETCH_QUIZZES_QUERY,FETCH_USER_QUERY } from '../Calls'
import { useParams } from 'react-router'
import { AuthContext } from '../context/auth'

const Profile = (props) => {
  const { contextUserId } = useContext(AuthContext);
  const { _id:siteUserId } = useParams();
  const  { data:userData}  = useQuery(FETCH_USER_QUERY, { variables: { userId: siteUserId } });
  const user = userData?.getUser

  const filters = contextUserId === siteUserId ? { creator: siteUserId } : { creator: siteUserId, published: true }

  const { data, loading, refetch } = useQuery(FETCH_QUIZZES_QUERY, { variables: { filters: filters } });

  useEffect(() => {
    refetch()
  }, [refetch]);

  const [addQuiz] = useMutation(CREATE_QUIZ, {
    variables: { name: "Default Quiz Name", creatorId: contextUserId },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    onCompleted() { refetch() }
  });

  const quizzes = data?.getQuizzes;

  if(loading) { return <Loading/> }
  if(!user) { return <PageNotFound message="No Access Error"/> }
 
  return (
    <div className="container">  
      <ProfileBanner user={user} addQuiz={addQuiz}/>
      <div className="container">
        <div className="row row-cols-auto g-3"> 
          {quizzes && quizzes.map((quiz, index) =>
            <div className="col"  key={index}>           
              <QuizCard quiz={quiz}  history={props.history}/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile;