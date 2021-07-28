const Pagination = ({ moviesPerPage, totalMovies, paginate }) => {
  console.log(moviesPerPage, totalMovies);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(pageNumbers);

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return <li onClick={() => paginate(number)}>{number}</li>;
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
