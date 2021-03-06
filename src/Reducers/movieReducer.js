const initialState = {
  movies: [],
  categories: [],
  filteredMovies: [],
  selectedCat: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetchData": {
      // Retreive categories from movies
      const categories = action.payload.map((movie) => movie.category);
      const catStateObject = [];
      // Build an array of categories object for the top state
      categories.forEach((cat) => {
        const categoryItem = { name: cat, count: 1, isSelected: false };
        const existingCategoryItem = catStateObject.find(
          (item) => item.name === categoryItem.name
        );
        if (existingCategoryItem) {
          existingCategoryItem.count = existingCategoryItem.count + 1;
        } else {
          catStateObject.push(categoryItem);
        }
      });

      return {
        ...state,
        movies: action.payload,
        categories: catStateObject,
      };
      break;
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
      break;
    }

    case "dislike": {
      const moviesCopy = [...state.movies];
      const movie = moviesCopy.find((movie) => movie.id === action.payload);
      if (movie) {
        movie.dislikes = movie.dislikes + 1;
      }
      return {
        ...state,
        movies: moviesCopy,
      };
      break;
    }

    case "delete": {
      const moviesCopy = [...state.movies];
      const filteredMOviesCopy = [...state.filteredMovies];
      const categoriesCopy = [...state.categories];

      const movie = moviesCopy.find((movie) => movie.id === action.payload);
      const filteredMovie = filteredMOviesCopy.find(
        (movie) => movie.id === action.payload
      );
      const currentCat = movie.category;
      const category = categoriesCopy.find((cat) => cat.name === currentCat);

      if (movie) {
        const movieIndex = moviesCopy.indexOf(movie);
        moviesCopy.splice(movieIndex, 1);
      }

      if (filteredMovie) {
        const filteredMovieIndex = filteredMOviesCopy.indexOf(filteredMovie);
        filteredMOviesCopy.splice(filteredMovieIndex, 1);
      }

      category.count = category.count - 1;

      return {
        ...state,
        movies: moviesCopy,
        categories: categoriesCopy,
        filteredMovies: filteredMOviesCopy,
      };
      break;
    }

    case "filter": {
      const selectedCatCopy = [...state.selectedCat];
      const categoriesCopy = [...state.categories];

      // check if categoriy is already filtered
      const isSelected = action.payload.isSelected;
      const currentCat = categoriesCopy.find(
        (item) => item.name === action.payload.name
      );
      // if yes, remove it from the filter array
      if (isSelected) {
        selectedCatCopy.splice(selectedCatCopy.indexOf(action.payload.name), 1);
        currentCat.isSelected = false;
      }

      // if not, add it to the filter array and change it prop "isSelected" to true
      if (!isSelected) {
        selectedCatCopy.push(action.payload.name);
        currentCat.isSelected = true;
      }

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
        categories: categoriesCopy,
        filteredMovies: filteredMOviesCopy,
        selectedCat: selectedCatCopy,
      };

      break;
    }

    case "clearFilters": {
      const categoriesCopy = [...state.categories];
      categoriesCopy.forEach((cat) => (cat.isSelected = false));
      return {
        ...state,
        categories: categoriesCopy,
        filteredMovies: [],
        selectedCat: [],
      };
    }

    default:
      return state;
  }
};

module.exports = movieReducer;
