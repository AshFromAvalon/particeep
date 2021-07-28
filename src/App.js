import "./App.css";
import { useSelector } from "react-redux";
import MovieCard from "./components/MovieCard";

function App() {
  const movies = useSelector((state) => state.movies);

  return (
    <main className="container">
      <div className="wrapper">
        <ul className="grid">
          {movies.map((movie) => {
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
    </main>
  );
}

export default App;
