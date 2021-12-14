import React, { useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";

import QuizCard from "../components/QuizCard";
import Loading from "../components/Loading";
import { AuthContext } from "../context/auth";
import { FETCH_QUIZZES_QUERY, FETCH_USER_QUERY, FETCH_QUIZZES_ADVANCED, FETCH_LEADERBOARD } from "../Calls";
import HomeCarousel from "../components/home/HomeCarousel";
import Panel from "../components/home/Panel/Panel";

const Home = (props) => {
  const { contextUserId } = useContext(AuthContext)

  const { data:userData, refetch:refetchUser } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: contextUserId }
  });
  const user = userData?userData.getUser:null

  const { data, refetch } = useQuery(FETCH_QUIZZES_QUERY, {
    variables: { filters: { published: true } }
  });

  const { data:trendingQuizzesData, refetch:refetchQuizzesAdvanced } = useQuery(FETCH_QUIZZES_ADVANCED, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { sorting: {quiz: 'timesPlayed', dir: -1}, limit: 3 }
  });

  const { data:leaderboardData, refetch:refetchLeaderboard } = useQuery(FETCH_LEADERBOARD, {
    variables: { userId: contextUserId }
  });

  useEffect(() => {
    refetch()
    refetchUser()
    refetchQuizzesAdvanced()
    refetchLeaderboard()
  }, [refetch, refetchLeaderboard, refetchQuizzesAdvanced, refetchUser])

  if (!data || !leaderboardData) {
    return <Loading />;
  }

  const leaderboardUsers = leaderboardData?leaderboardData.getLeaderboard:[]

  const { getQuizzes: quizzes } = data;
  const featuredQuizzes = quizzes.filter((quiz) => quiz?.rating > 0).slice(0, 4);
  let trendingQuizzes = trendingQuizzesData ? trendingQuizzesData.getQuizzesAdvanced : []

  return (
    <div className="container-fluid pb-3">

      <div className="row px-0">
        <HomeCarousel quizzes={trendingQuizzes} history={props.history}/>
      </div>

      <div className="row container-fluid pt-2">
        <div className="col-auto">
          <Panel
            title="Featured Quizzes"
            type="quiz"
            data={featuredQuizzes}
            history={props.history}
            home={true}
            color={user?.color}
          />
        </div>
        <div className="col-auto">
          <Panel
            title="Trending Platforms"
            type="platforms"
            data={[]}
            history={props.history}
            home={true}
            color={user?.color}
          />
        </div>
        <div className="col-auto">
          <Panel
            title="Leaderboard"
            type="leaderboard"
            data={leaderboardUsers}
            history={props.history}
            home={true}
            color={user?.color}
          />
        </div>
      </div>

      <div className="row pb-4 mt-5 ps-3">
        <div className="col col-auto self-align-center bg-secondary pt-2 rounded">
          <h5 className="text-white">All Quizzes</h5>
        </div>
      </div>

      <div className="row row-cols-auto g-3">
        {quizzes && quizzes.map((quiz, index) => (
          <div className="col" key={index}>
            <QuizCard quiz={quiz} home={true} history={props.history} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;
