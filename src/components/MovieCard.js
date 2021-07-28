import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ id, title, likes, dislikes, category }) => {
  const dispatch = useDispatch();

  const getWidthRatio = () => {
    const total = likes + dislikes;
    const likePercentage = (likes / total) * 100;
    if (id == 4) {
      console.log(`${likePercentage.toFixed(2)}%`);
    }
    return `${likePercentage.toFixed(2)}%`;
  };

  return (
    <li className="grid-item">
      <div className="grid-item-wrapper">
        <div className="row">
          <div className="col">
            <h2 className="mb-2">{title}</h2>
          </div>
          <div className="col">
            <p className="mb-2">{category}</p>
          </div>
        </div>

        <div className="row">
          <div className="row--col">
            <div className="col icon-container">
              <div className="btn-icon">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ cursor: "pointer" }}
                  size="lg"
                  onClick={() => dispatch({ type: "like", payload: id })}
                />
              </div>
              <div className="btn-icon">
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  style={{ cursor: "pointer" }}
                  size="lg"
                  onClick={() => dispatch({ type: "dislike", payload: id })}
                />
              </div>
            </div>
            <div className="row">
              <div className="bg-gauge">
                <div
                  className="gauge"
                  style={{
                    width: getWidthRatio(),
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="btn-icon">
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ cursor: "pointer" }}
                size="sm"
                onClick={() => dispatch({ type: "delete", payload: id })}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
