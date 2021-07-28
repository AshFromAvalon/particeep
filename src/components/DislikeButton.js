import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const DislikeButton = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faThumbsDown} />
    </div>
  );
};

export default DislikeButton;
