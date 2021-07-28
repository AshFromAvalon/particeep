const Pagination = ({ moviesPerPage, totalMovies, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="container row--start pagination">
        {pageNumbers.map((number) => {
          return (
            <li className="pagination-item" onClick={() => paginate(number)}>
              {number}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
