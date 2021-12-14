import React from "react";
import QuizCard from "../../QuizCard";

const Panel = ({ title, data, type, history, home, color }) => {
  return (
    <div className="container-fluid p-0">
      <div className="rounded-top px-3 pt-3 pb-1 w-100 border border-1"
        style={{  backgroundColor: color?color:"#9FA300", textAlign: "center" }}>
        <h5>{title}</h5>
      </div>
      {data && data.map((datum, i) =>
        type === "rewards" ? (
          <div key={datum._id}>Rewards Card</div>
        )
        : 
        type==="leaderboard" ?
          <div key={i} className="container-fluid px-1 border border-1 py-1 pointer leaderboard-card" onClick={() => history.push('/profile/'+datum._id)}>
            <div className="row p-0 m-0" style={{height: '65px'}}>
              <div className="col-auto p-0 pe-2">
                <div className='bg-dark' style={{borderRadius: '50px', width: '60px', height: '60px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage:datum?.avatar?.url ? 'url('+datum.avatar.url+')' :'url(https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png)'}}></div>
              </div>
              <div className="col px-0 pe-4 pt-3">
                <span><b>{i+1})</b> {datum.name} ({datum.username})</span>
              </div>
              <div className="col-auto px-0 ps-4  pt-3">{datum.points} points</div>
            </div>
          </div>
        : (
          <div className="mt-1" key={i}>
          <QuizCard
            home={home}
            className="quiz-card"
            quiz={datum}
            key={datum._id}
            history={history}
          />
          </div>
        )
      )}
    </div>
  );
};

export default Panel;
