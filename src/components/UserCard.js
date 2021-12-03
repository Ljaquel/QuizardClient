import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function UserCard({ home, user }) {
  const history = useHistory()
  const { contextUserId } = useContext(AuthContext);
  return (
      <div
        className="card mb-3 quiz-card rounded h-100"
        style={{ maxWidth: "400px" }}
        onClick={() => history.push(`/profile/${user._id}`)}
      >
        <div className="row g-0 h-100">
          <div className="col-5 px-1 py-1 h-100">
            <img
              className="img-thumbnail"
              src={
                user?.avatar?.url
                  ? user?.avatar?.url
                  : "https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png"
              }
              style={{ padding: "0.10rem", backgroundColor: "#fff" }}
              alt="..."
            />
          </div>
          <div className="col-7 border-start h-100">
            <div className="card-body">
              <h5 className="card-title">{user?.name}</h5>
              <p className="card-text">
                {.description.length < 80
                  ? quiz.description
                  : quiz.description.substring(0, 80) + "..."}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer border-start">
          <div className="row">
            <div className="col align-self-center">
              <small className="text-muted">
                {quiz.publishedDate.length > 0
                  ? "Published " + moment(quiz.publishedDate).fromNow()
                  : "Created " + moment(quiz.createdAt).fromNow()}
              </small>
            </div>
            <div className="col-auto align-self-center pt-1">
              <Rating
                name="readOnly"
                value={quiz.rating}
                size="small"
                precision={0.5}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
  );
}

export default UserCard;