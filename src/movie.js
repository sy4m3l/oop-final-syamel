const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('id');

let movieTitle;
let movieGenre;
let movieDirector;
let moviePlot;
let movieRating;

async function fetchMovieDetails(imdbID) {
  const url = `https://www.omdbapi.com/?apikey=fab1530e&i=${encodeURIComponent(imdbID)}&plot=full`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}
function displayMovieDetails(movie) {
  const moviePosterContainer = document.getElementById('moviePoster');
  const movieDetailsContainer = document.getElementById('movieDetails');
  const castAndCrewList = document.getElementById('castAndCrewList');
  if (movie) {
    moviePosterContainer.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title} Poster" width="300">
    `;
    movieDetailsContainer.innerHTML = `
      <h2>${movie.Title} (${movie.Year})</h2>
      <br><br>
      <p><strong>Genre:</strong> ${movie.Genre}</p>
      <br><br>
      <p><strong>IMDb ID:</strong> ${movie.imdbID}</p>
      <br><br>
      <p><strong>Director:</strong> ${movie.Director}</p>
      <br><br>
      <p><strong>Plot:</strong> ${movie.Plot}</p>
      <br><br>
      <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
    `;
    movieTitle = movie.Title;
    movieGenre = movie.Genre;
    movieDirector = movie.Director;
    moviePlot = movie.Plot;
    movieRating = movie.imdbRating;
    if (movie.Actors) {
      const actors = movie.Actors.split(', ');
      actors.forEach(actor => {
        const listItem = document.createElement('li');
        listItem.textContent = actor;
        castAndCrewList.appendChild(listItem);
      });
    }
    addToWatchlistButton.disabled = false;
  } else {
    movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
  }
}
fetchMovieDetails(imdbID)
  .then((movie) => {
    displayMovieDetails(movie);
  })
  .catch((error) => {
    console.error('Error:', error);
    displayMovieDetails(null);
  });
const addToWatchlistButton = document.getElementById('addToWatchlistButton');
addToWatchlistButton.addEventListener('click', addToWatchlist);
function addToWatchlist() {
  const movie = {
    title: movieTitle,
    ID: imdbID,
    genre: movieGenre,
    director: movieDirector,
    plot: moviePlot,
    rating: movieRating,
    poster: document.querySelector('#moviePoster img').src
  };
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  window.location.href = 'watchlist.html';
}
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.history.back();
});
