import { useDispatch } from "react-redux";

const Modal = ({ showModal, isShowing, movieId }) => {
  const dispatch = useDispatch();
  const showStyle = isShowing ? { display: "block" } : { display: "none" };

  return (
    <div className="modal" style={showStyle}>
      <div class="modal-content">
        <span onClick={() => showModal(false)} class="close">
          X
        </span>
        <p>You're about to permanently delete this movie.</p>
        <p className="mb-2">Please confirm.</p>

        <button
          onClick={() => dispatch({ type: "delete", payload: movieId })}
          className="modal-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
