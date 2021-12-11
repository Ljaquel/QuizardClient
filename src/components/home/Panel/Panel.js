import React from "react";
import QuizCard from "../../QuizCard";

const Panel = ({ title, data, type, history, home }) => {
  return (
    <div className="container-fluid">
      <div
        className="rounded mb-1"
        style={{
          backgroundColor: "#9FA300",
          textAlign: "center",
          padding: "7px",
          width: "100%",
          maxWidth: "400px"
        }}>
        <h4 className="text-white">{title}</h4>
      </div>
      <div>
        {data &&
          data.map((datum) =>
            type === "rewards" ? (
              <div key={datum._id}>Rewards Card</div>
            ) : (
              <QuizCard
                home={home}
                className="quiz-card"
                quiz={datum}
                key={datum._id}
                history={history}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Panel;
