const NumberOfMovieFilter = ({ handleNumberOfMoviesPerPage, limitOptions }) => {
  return (
    <div className="row--col mb-2">
      <h2 className="mb-2">Number of movies per page</h2>
      <div className="col">
        {limitOptions.map((option) => {
          return (
            <p
              className={
                option.isSelected
                  ? "nav-limit-item nav-limit-item--active"
                  : "nav-limit-item"
              }
              onClick={() => handleNumberOfMoviesPerPage(option)}
            >
              {option.number}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default NumberOfMovieFilter;
