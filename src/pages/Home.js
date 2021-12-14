import React, { useEffect, useContext, useState } from "react";
import { useQuery } from "@apollo/client";

import QuizCard from "../components/QuizCard";
import Loading from "../components/Loading";
import { AuthContext } from "../context/auth";
import { FcGenericSortingAsc, FcGenericSortingDesc } from "react-icons/fc";
import { FETCH_USER_QUERY, FETCH_QUIZZES_ADVANCED, FETCH_LEADERBOARD } from "../Calls";
import HomeCarousel from "../components/home/HomeCarousel";
import Panel from "../components/home/Panel/Panel";

const Home = (props) => {
  const { contextUserId } = useContext(AuthContext)
  const [sorting, setSorting] = useState({quiz: 'rating', dir: -1})

  const { data:userData, refetch:refetchUser } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: contextUserId }
  });
  const user = userData?userData.getUser:null

  const { data, refetch } = useQuery(FETCH_QUIZZES_ADVANCED, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { filters: { published: true }, sorting, limit: 20 }
  });

  const { data:trendingQuizzesData, refetch:refetchQuizzesAdvanced } = useQuery(FETCH_QUIZZES_ADVANCED, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { filters: { published: true }, sorting: {quiz: 'timesPlayed', dir: -1}, limit: 3 }
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

  if (!leaderboardData) {
    return <Loading />;
  }

  const leaderboardUsers = leaderboardData?leaderboardData.getLeaderboard:[]

  const quizzes = data?data.getQuizzesAdvanced:[];
  let trendingQuizzes = trendingQuizzesData ? trendingQuizzesData.getQuizzesAdvanced : []

  return (
    <div className="container-fluid pb-3">

      <div className="row px-0">
        <HomeCarousel quizzes={trendingQuizzes} history={props.history}/>
      </div>

      <div className="row container-fluid pt-2">
        <div className="col">

          <div className="row pb-4 ps-3">
            <div className="col col-auto  pt-2 rounded" style={{backgroundColor: user?.color ? user.color: '#ffffff'}}>
              <h6 className="">Quizzes</h6>
            </div>
            <div className="col-auto">
              <div className="input-group">
                <label className={"input-group-text pointer"} onClick={() => setSorting({...sorting, dir:(sorting.dir===1?-1:1) })} htmlFor="quizSortingSelect">{sorting.dir===1?<FcGenericSortingAsc size={23}/>:<FcGenericSortingDesc size={23}/>}</label>
                <select id="quizSortingSelect" className="form-select form-select-sm" value={sorting.quiz ? sorting.quiz : "rating"} onInput={e => { setSorting({...sorting, quiz: e.target.value}); }}>
                  <option value={"rating"}>Rating</option>
                  <option value={"timesPlayed"}>Times Played</option>
                  <option value={"publishedDate"}>Published Date</option>
                  <option value={"name"}>Name</option>
                </select>
              </div>
            </div>
          </div>

          {data ? <div className="row row-cols-auto g-3">
            {quizzes && quizzes.map((quiz, index) => (
              <div className="col" key={index}>
                <QuizCard quiz={quiz} home={true} history={props.history} />
              </div>
            ))}
          </div>
          :
          <Loading />
          }
        </div>
        <div className="col-auto p-0">
          <Panel
            title="Leaderboard"
            type="leaderboard"
            data={leaderboardUsers}
            history={props.history}
            home={true}
            color={user?.color}
          />
          <Panel
            title="Trending Platforms"
            type="platforms"
            data={[]}
            history={props.history}
            home={true}
            color={user?.color}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
