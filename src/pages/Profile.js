import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import ProfileBanner from '../components/ProfileBanner'
import QuizCard from '../components/QuizCard'
import Loading from '../components/Loading'
import PageNotFound from '../pages/PageNotFound'
import { CREATE_QUIZ, FETCH_QUIZZES_QUERY,FETCH_USER_QUERY } from '../Calls'
import { useParams } from 'react-router'

const Profile = () => {
  const { _id:siteUserId } = useParams();
  const  { data:userData}  = useQuery(FETCH_USER_QUERY, { variables: { userId: siteUserId } });
  const user = userData?.getUser

  const { data, loading, refetch } = useQuery(FETCH_QUIZZES_QUERY, { variables: { filters: { creator: siteUserId, published: true } } });

  useEffect(() => {
    refetch()
  }, [refetch]);

  const [addQuiz] = useMutation(CREATE_QUIZ, {
    variables: { name: "Default Quiz Name", creator: user?._id },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    update(cache, { data: { createQuiz }}){
      cache.writeQuery({
        query: FETCH_QUIZZES_QUERY,
        data: {
          getQuizzes: [createQuiz, ...data.getQuizzes]
        },
        variables: { filters: { creator: user?._id } }
      })
    }
  });

  const quizzes = data?.getQuizzes;

  if(loading) { return <Loading/> }
  if(!user) { return <PageNotFound message="No Access Error"/> }
 
  return (
    <div className="container-fluid">  
      <ProfileBanner user={user} addQuiz={addQuiz}/>
      <div className="container">
        <div className="row row-cols-auto g-3"> 
          {quizzes && quizzes.map((quiz, index) =>
            <div className="mcol"  key={index}>           
              <QuizCard quiz={quiz}/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile;