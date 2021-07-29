import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { movies$ } from "./movies";

import Pagination from "./components/Pagination";
import MovieCard from "./components/MovieCard";
import Nav from "./components/Nav";
import NumberOfMovieFilter from "./components/NumberOfMovieFilter";
import CategoryFilter from "./components/CategoryFilter";

const limitOptionsData = [
  { number: 4, isSelected: true },
  { number: 8, isSelected: false },
  { number: 12, isSelected: false },
];

function App() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const filteredMovies = useSelector((state) => state.filteredMovies);
  // Only get categories for movies in the list
  const categories = useSelector((state) =>
    state.categories.filter((cat) => cat.count > 0)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(4);
  const [limitOptions, setLimitOptions] = useState(limitOptionsData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
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

  // Set number of items
  const handleNumberOfMoviesPerPage = (option) => {
    const limitOptionsCopy = [...limitOptions];
    const currentOption = limitOptionsCopy.find(
      (item) => item.number === option.number
    );
    const currentSelectedOption = limitOptionsCopy.find(
      (item) => item.isSelected
    );

    if (currentOption) {
      if (!currentOption.isSelected) {
        currentOption.isSelected = true;
        currentSelectedOption.isSelected = false;
      }
    }
    setLimitOptions(limitOptionsCopy);
    paginate(1);
    setMoviesPerPage(option.number);
  };

  return (
    <main className="container">
      <header className="container">
        <div className="row--col">
          <h1>Particeep's technical test</h1>
          <p>Thomas Le Bihan - Front End Junior Developer</p>
        </div>
      </header>

      <div className="row">
        <Nav>
          <NumberOfMovieFilter
            limitOptions={limitOptions}
            handleNumberOfMoviesPerPage={handleNumberOfMoviesPerPage}
          />
          <CategoryFilter categories={categories} />
        </Nav>

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
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
