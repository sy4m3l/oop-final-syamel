const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesContainer = document.getElementById('movies');
const loadMoreButton = document.getElementById('loadMoreButton');
const API_KEY = 'fab1530e';
const API_URL = 'https://www.omdbapi.com/';
let currentPage = 1;
let totalResults = 0;
let isLoading = false;
let searchTerm = '';

searchButton.addEventListener('click', () => {
  searchTerm = searchInput.value.trim();
  if (searchTerm) {
    resetMovies();
    fetchMovies(searchTerm);
    loadMoreButton.style.display = 'none';
  }
});

function searchMovies(searchTerm) {
  resetMovies();
  fetchMovies(searchTerm);
}

function resetMovies() {
  currentPage = 1;
  totalResults = 0;
  moviesContainer.innerHTML = '';
}

function fetchMovies(searchTerm) {
  if (isLoading) return;

  isLoading = true;

  const url = `${API_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${currentPage}&type=movie`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        displayMovies(data.Search);
        totalResults = parseInt(data.totalResults);
        currentPage++;
        isLoading = false;
        showLoadMoreButton();
      } else {
        displayError(data.Error);
        isLoading = false;
      }
    })
    .catch(error => {
      displayError('An error occurred. Please try again later.');
      isLoading = false;
    });
}

function displayMovies(movies) {
  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    moviesContainer.appendChild(movieElement);
  });
}

function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('movie-details');

  const titleElement = document.createElement('h3');
  titleElement.textContent = movie.Title;

  const yearElement = document.createElement('p');
  yearElement.textContent = `Year: ${movie.Year}`;

  const idElement = document.createElement('p');
  idElement.textContent = `ID: ${movie.imdbID}`;

  detailsContainer.appendChild(titleElement);
  detailsContainer.appendChild(yearElement);
  detailsContainer.appendChild(idElement);

  const posterElement = document.createElement('img');
  posterElement.classList.add('movie-poster');
  posterElement.alt = movie.Title + ' Poster';

  if (movie.Poster !== 'N/A') {
    posterElement.src = movie.Poster;
  } else {
    posterElement.src = 'no-image-available.png';
  }

  movieElement.appendChild(posterElement);
  movieElement.appendChild(detailsContainer);

  movieElement.addEventListener('click', () => {
    navigateToMovieDetails(movie.imdbID);
  });

  return movieElement;
}

function displayError(message) {
  moviesContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

function showLoadMoreButton() {
  if (moviesContainer.childElementCount < totalResults) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
}

function loadMoreMovies() {
  if (isLoading) return;
  fetchMovies(searchTerm);
}

function navigateToMovieDetails(movieId) {
  const url = `movie.html?id=${movieId}`;
  window.location.href = url;
}

loadMoreButton.addEventListener('click', loadMoreMovies);
