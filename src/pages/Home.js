import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

// import QuizCard from "../components/QuizCard";
import Loading from "../components/Loading";
// import { AuthContext } from "../context/auth";
import { FETCH_QUIZZES_QUERY } from "../Calls";
import HomeCarousel from "../components/home/HomeCarousel";
import Panel from "../components/home/Panel/Panel";

const Home = (props) => {
  // const { contextUserId } = useContext(AuthContext);
  const { data, refetch } = useQuery(FETCH_QUIZZES_QUERY, {
    variables: { filters: { published: true } }
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!data) {
    return <Loading />;
  }

  const { getQuizzes: quizzes } = data;
  const featuredQuizzes = quizzes.filter((quiz) => quiz?.rating > 0);
  const trendingQuizzes = quizzes.filter((quiz) => quiz?.ratingCount > 0);

  return (
    <div className="container-fluid">
      <div className="row px-3 pb-2 pt-5">
        <h1 className=" col-3">Quizard</h1>
      </div>
      <div className="row container-fluid">
        <div className="col left-panel">
          <div
            style={{
              width: "300px",
              height: "75vh",
              backgroundColor: "#1C8E96"
            }}
          >
            {" "}
          </div>
        </div>
        <div className="col">
          <HomeCarousel quizzes={featuredQuizzes} />
        </div>
        <div className="col right-panel">
          <div
            style={{
              width: "300px",
              height: "75vh",
              backgroundColor: "#BD3939"
            }}
          ></div>
        </div>
      </div>
      {/* <div className="row row-cols-auto g-3">
        {contextUserId &&
          quizzes &&
          quizzes.map((quiz, index) => (
            <div className="col" key={index}>
              <QuizCard quiz={quiz} home={true} history={props.history} />
            </div>
          ))}
      </div> */}
      <div className="row row-cols-auto container-fluid">
        <div className="col">
          <Panel
            title="Featured Quizzes"
            type="quiz"
            data={featuredQuizzes}
            history={props.history}
          />
        </div>
        <div className="col">
          <Panel
            title="Trending Quizzes"
            type="quiz"
            data={trendingQuizzes}
            history={props.history}
          />
        </div>
        <div className="col">
          <Panel
            title="Community Rewards"
            type="rewards"
            data={[]}
            history={props.history}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
