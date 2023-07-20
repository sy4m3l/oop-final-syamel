const recommendedMoviesContainer = document.getElementById('recommendedMoviesContainer');
const gridContainer = document.getElementById("gridContainer");
async function fetchRecommendedMovies() {
  const apiKey = 'fab1530e';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=&type=movie`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      const movies = data.Search || [];
      movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
      return movies;
    } else {
      console.error('Error fetching recommended movies:', data.Error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    return [];
  }
}
function displayRecommendedMovies(movies) {
  recommendedMoviesContainer.innerHTML = '';
  if (movies.length === 0) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = '';
    recommendedMoviesContainer.appendChild(errorMessage);
    return;
  }
  const movieList = document.createElement('ul');
  movieList.classList.add('movie-list');
  movies.forEach((movie) => {
    const movieItem = createMovieListItem(movie);
    movieList.appendChild(movieItem);
  });
  recommendedMoviesContainer.appendChild(movieList);
}
fetchRecommendedMovies()
  .then((movies) => {
    displayRecommendedMovies(movies);
  })
  .catch((error) => {
    console.error('Error:', error);
    displayRecommendedMovies([]);
  });
function movieSearch() {
  var movieTitle = document.getElementById("movieTitle").value;
  fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=fab1530e&s=${encodeURIComponent(movieTitle)}`)
    .then((response) => response.json())
    .then((data) => {
      gridContainer.innerHTML = '';
      if (data.Search && data.Search.length > 0) {
        const movies = data.Search;
        const fetchPromises = movies.map((movie) => {
          return fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=4b75f613`)
            .then((response) => response.json())
            .then((movieDetails) => movieDetails);
        });
        Promise.all(fetchPromises)
          .then((moviesWithDetails) => {
            const sortedMovies = moviesWithDetails.sort((a, b) => b.Year - a.Year);
            sortedMovies.forEach((movie) => {
              const movieItem = createMovieListItem(movie);
              gridContainer.appendChild(movieItem);
            });
          });
      } else {
        gridContainer.innerHTML = '<p>No results found</p>';
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
function createMovieListItem(movie) {
  const movieItem = document.createElement('li');
  movieItem.className = 'movie-item';
  const posterCell = document.createElement('div');
  const posterImg = document.createElement('img');
  posterImg.src = movie.Poster;
  posterImg.alt = `${movie.Title} Poster`;
  posterImg.classList.add('poster-image');
  posterCell.appendChild(posterImg);
  const titleCell = document.createElement('div');
  titleCell.textContent = `Title: ${movie.Title}`;
  const yearCell = document.createElement('div');
  yearCell.textContent = `Released: ${movie.Year}`;
  movieItem.appendChild(posterCell);
  movieItem.appendChild(titleCell);
  movieItem.appendChild(yearCell);
  movieItem.addEventListener('click', () => {
    navigateToMovieDetail(movie.imdbID);
  });
  return movieItem;
}
function navigateToMovieDetail(imdbID) {
  window.location.href = `movie.html?id=${imdbID}`;
}
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.history.back();
});
