import React from "react";
import QuizCard from "../../QuizCard";
import "./Panel.css";

const Panel = ({ title, data, type, history }) => {
  return (
    <div className="container-fluid">
      <div
        style={{
          backgroundColor: "#9FA300",
          textAlign: "center",
          padding: "7px",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        <h3 className="text-white">{title}</h3>
      </div>
      <div>
        {data &&
          data.map((datum) =>
            type === "rewards" ? (
              <div key={datum._id}>Rewards Card</div>
            ) : (
              <QuizCard
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
