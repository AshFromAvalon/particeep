import "./App.css";
import { useSelector } from "react-redux";
import MovieCard from "./components/MovieCard";
import { useState } from "react";
import Pagination from "./components/Pagination";

function App() {
  const movies = useSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(4);
  const categories = [...new Set(movies.map((movie) => movie.category))];
  const [selectedCat, setSelectedCat] = useState(categories);

  // const handleSelect = (cat) => {
  //   console.log(cat);
  //   const newArr = [];
  //   if (newArr.indexOf(cat) < 0) {
  //     newArr.push(cat);
  //   }

  //   setSelectedCat(newArr);
  // };

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="container">
      <header className="container">
        <h1>Particeep technical test</h1>
      </header>
      <div className="row">
        <nav className="nav col">
          <div className="row-col">
            <div className="col mb-2">
              <div className="row-col">
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
              <div className="row-col">
                <h2 className="mb-2">Categories</h2>
                {categories.map((category) => {
                  return (
                    <div className="row nav-category-item">
                      <p>{category}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        <div className="col">
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
        </div>
      </div>
      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        paginate={paginate}
      />
    </main>
  );
}

export default App;
