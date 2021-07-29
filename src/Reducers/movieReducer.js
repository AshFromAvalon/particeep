const initialState = {
  movies: [],
  categories: [],
  filteredMovies: [],
  selectedCat: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetchData": {
      const categories = action.payload.map((movie) => movie.category);
      const uniqCategories = [...new Set(categories)];

      return {
        ...state,
        movies: action.payload,
        categories: uniqCategories,
      };
    }

    case "like": {
      const moviesCopy = [...state.movies];
      const movie = moviesCopy.find((movie) => movie.id === action.payload);
      if (movie) {
        movie.likes = movie.likes + 1;
      }
      return {
        ...state,
        movies: moviesCopy,
      };
    }

    case "dislike": {
      const moviesCopy = [...state.movies];
      const movie = moviesCopy.find((movie) => movie.id === action.payload);
      if (movie) {
        movie.likes = movie.dislikes + 1;
      }
      return {
        ...state,
        movies: moviesCopy,
      };
    }

    case "delete": {
      const moviesCopy = [...state.movies];
      const movie = moviesCopy.find((movie) => movie.id === action.payload);
      console.log(movie);
      if (movie) {
        const index = moviesCopy.indexOf(movie);
        moviesCopy.splice(index, 1);
      }
      return {
        ...state,
        movies: moviesCopy,
      };
    }

    case "filter": {
      const selectedCatCopy = [...state.selectedCat];
      selectedCatCopy.includes(action.payload)
        ? selectedCatCopy.splice(selectedCatCopy.indexOf(action.payload), 1)
        : selectedCatCopy.push(action.payload);

      let filteredMOviesCopy = [...state.filteredMovies];
      // if no filter selected, reset filteredMovies
      if (selectedCatCopy.length === 0) {
        filteredMOviesCopy = [];
      }
      // if filter(s) selected, fill filterMovies
      if (selectedCatCopy.length > 0) {
        filteredMOviesCopy = [
          ...state.movies.filter((movie) =>
            selectedCatCopy.includes(movie.category)
          ),
        ];
      }

      return {
        ...state,
        filteredMovies: filteredMOviesCopy,
        selectedCat: selectedCatCopy,
      };
    }

    default:
      return state;
  }
};

module.exports = movieReducer;
