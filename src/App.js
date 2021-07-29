import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "./components/MovieCard";
import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import { movies$ } from "./movies";

function App() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const filteredMovies = useSelector((state) => state.filteredMovies);
  const categories = useSelector((state) =>
    state.categories.filter((cat) => cat.count > 0)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      await movies$.then((movies) =>
        dispatch({ type: "fetchData", payload: movies })
      );
    };
    getMovies();
    setIsLoading(false);
  }, []);

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies =
    filteredMovies.length > 0
      ? filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)
      : movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const moviesLength =
    filteredMovies.length > 0 ? filteredMovies.length : movies.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="container">
      <header className="container">
        <div className="row--col">
          <h1>Particeep's technical test</h1>
          <p>Thomas Le Bihan - Front End Junior Developer</p>
        </div>
      </header>
      <div className="row">
        <nav className="nav col">
          <div className="row--col">
            <div className="col mb-2">
              <div className="row--col">
                <h2 className="mb-2">Number of movies per page</h2>
                <div className="col">
                  <p
                    className="nav-limit-item"
                    onClick={() => setMoviesPerPage(4)}
                  >
                    4
                  </p>
                  <p
                    className="nav-limit-item"
                    onClick={() => setMoviesPerPage(8)}
                  >
                    8
                  </p>
                  <p
                    className="nav-limit-item"
                    onClick={() => setMoviesPerPage(12)}
                  >
                    12
                  </p>
                </div>
              </div>
            </div>
            <div className="col mb-2">
              <div className="row--col">
                <h2 className="mb-2">Categories</h2>
                {categories.map((category) => {
                  return (
                    <div className="row nav-category-item">
                      <p
                        onClick={() =>
                          dispatch({ type: "filter", payload: category })
                        }
                      >
                        {category.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        <div className="col-list">
          <div className="row--col">
            <ul className="grid">
              {currentMovies.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    likes={movie.likes}
                    dislikes={movie.dislikes}
                    category={movie.category}
                  />
                );
              })}
            </ul>
            <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={moviesLength}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
