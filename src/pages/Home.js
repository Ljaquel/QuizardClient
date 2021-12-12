import React, { useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";

import QuizCard from "../components/QuizCard";
import Loading from "../components/Loading";
import { AuthContext } from "../context/auth";
import { FETCH_QUIZZES_QUERY } from "../Calls";
import HomeCarousel from "../components/home/HomeCarousel";
import Panel from "../components/home/Panel/Panel";

const Home = (props) => {
  const { contextUserId } = useContext(AuthContext)

  const { data, refetch } = useQuery(FETCH_QUIZZES_QUERY, {
    variables: { filters: { published: true } }
  });

  useEffect(() => {
    refetch()
  }, [refetch])

  if (!data) {
    return <Loading />;
  }

  const { getQuizzes: quizzes } = data;
  const featuredQuizzes = quizzes.filter((quiz) => quiz?.rating > 0);
  const trendingQuizzes = quizzes.filter((quiz) => quiz?.ratingCount > 0);
  let carouselQuizzes = [...quizzes].sort((a, b) => a?.rating<b?.rating?1:a?.rating===b?.rating?0:-1).slice(0, 3)

  return (
    <div className="container-fluid pb-3">

      <div className="row px-0">
        <HomeCarousel quizzes={carouselQuizzes} history={props.history}/>
      </div>

      <div className="row row-cols-auto container-fluid pt-1">
        <div className="col">
          <Panel
            title="Featured Quizzes"
            type="quiz"
            data={featuredQuizzes}
            history={props.history}
            home={true}
          />
        </div>
        <div className="col">
          <Panel
            title="Trending Quizzes"
            type="quiz"
            data={trendingQuizzes}
            history={props.history}
            home={true}
          />
        </div>
        <div className="col">
          <Panel
            title="Community Rewards"
            type="rewards"
            data={[]}
            history={props.history}
            home={true}
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
