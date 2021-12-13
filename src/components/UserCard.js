import React from "react";
import { useHistory } from "react-router-dom";

function UserCard({ user }) {
  const history = useHistory();
  // const { contextUserId } = useContext(AuthContext);
  return (
    <div
      className="card mb-3 quiz-card rounded h-100"
      style={{ maxWidth: "400px" }}
      onClick={() => history.push(`/profile/${user._id}`)}
    >
      <div className="row g-0">
        <div className="col-auto p-1">
          <div
            className="rounded-circle"
            style={{
              backgroundImage: user.avatar?.url? ("url("+user?.avatar?.url+")") :"url(https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png)",
              height: "125px",
              width: "125px",
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            alt="..."
          />
        </div>
        <div className="col border-start">
          <div className="card-body">
            <h5 className="card-title">{user?.name}</h5>
            <p className="card-text m-0">Level: {user?.level}</p>
            <p className="card-text m-0">Points: {user?.points}</p>
            <p className="card-text m-0">
              Followers: {user?.followers?.length} | Following:{" "}
              {user?.following.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;