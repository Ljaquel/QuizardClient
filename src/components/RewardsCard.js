import React from "react";

const RewardsCard = ({ reward }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="text-align-right">
          <svg className="bi" width="32" height="32" fill="currentColor">
            <use xlink:href="bootstrap-icons.svg#trophy-fill" />
          </svg>
        </span>
      </div>
      <div className="card-body">
        <p className="card-text">{reward?.description}</p>
      </div>
    </div>
  );
};

export default RewardsCard;
