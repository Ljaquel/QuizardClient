import React from "react";

const RewardsCard = ({ reward }) => {
  const fill =
    reward?.badgeType === "Gold"
      ? "#ffc107"
      : reward?.badgeType === "Silver"
      ? "#adb5bd"
      : reward?.badgeType === "Bronze"
      ? "#fd7c14"
      : "";
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{reward?.title}</h3>
        <span className="text-align-right">
          <svg className="bi" width="32" height="32" fill={fill}>
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
