import { useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";

const MovieCard = ({ id, title, likes, dislikes, category }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // GENERATE GAUGE'S WIDTH PERCENTAGE
  const getLlikeDislikeRatio = () => {
    const total = likes + dislikes;
    const likePercentage = (likes / total) * 100;
    return `${likePercentage.toFixed(2)}%`;
  };

  return (
    <li className="grid-item">
      {showModal && (
        <Modal showModal={setShowModal} isShowing={showModal} movieId={id} />
      )}
      <div className="grid-item-wrapper">
        <div className="row">
          {/* CARD HEAD */}
          <div className="col">
            <h2 className="mb-2">{title}</h2>
          </div>
          <div className="col">
            <p className="mb-2">{category}</p>
          </div>
        </div>

        {/* CARD BOTTOM */}
        <div className="row">
          <div className="row--col">
            <div className="col icon-container">
              {/* LIKE BUTTON */}
              <div className="btn-icon-like">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ cursor: "pointer" }}
                  size="sm"
                  onClick={() => dispatch({ type: "like", payload: id })}
                />
              </div>
              {/* DISLIKE BUTTON */}
              <div className="btn-icon-dislike">
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  style={{ cursor: "pointer" }}
                  size="sm"
                  onClick={() => dispatch({ type: "dislike", payload: id })}
                />
              </div>
            </div>
            <div className="row">
              <div className="bg-gauge">
                <div
                  className="gauge"
                  style={{
                    width: getLlikeDislikeRatio(),
                  }}
                ></div>
              </div>
              {/* DELETE BUTTON */}
              <div className="col">
                <div className="btn-icon">
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ cursor: "pointer" }}
                    size="sm"
                    onClick={() => setShowModal(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
