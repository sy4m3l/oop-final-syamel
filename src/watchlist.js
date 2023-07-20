let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
const watchlistContainer = document.getElementById('watchlist');
const watchedMoviesContainer = document.getElementById('watchedMovies');
function displayWatchlist() {
  watchlistContainer.innerHTML = '';
  watchlist.forEach((movie, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="poster">
        <a href="movie.html?id=${movie.ID}">
          <img src="${movie.poster}" alt="${movie.title} Poster" width="100">
        </a>
      </div>
      <div>
        <h2>
          <a class="movie-title" href="movie.html?id=${movie.ID}">${movie.title}</a>
        </h2>
      </div>
      <div class="movie-actions">
        <button class="watch-button" onclick="markAsWatched(${index})">Watched</button>
        <button class="delete-button" onclick="deleteFromWatchlist(${index})">Delete</button>
      </div>
    `;
    watchlistContainer.appendChild(listItem);
  });
}
function deleteFromWatchlist(index) {
  watchlist.splice(index, 1);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  displayWatchlist();
}
function displayWatchedMovies() {
  watchedMoviesContainer.innerHTML = '';
  watchedMovies.forEach((movie, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="poster">
        <a href="movie.html?id=${movie.ID}">
          <img src="${movie.poster}" alt="${movie.title} Poster" width="100">
        </a>
      </div>
      <div>
        <h2>
          <a class="movie-title" href="movie.html?id=${movie.ID}">${movie.title}</a>
        </h2>
      </div>
      <div class="movie-actions">
        <button class="delete-button" onclick="deleteFromWatched(${index})">Delete</button>
      </div>
    `;
    watchedMoviesContainer.appendChild(listItem);
  });
}
function deleteFromWatched(index) {
  watchedMovies.splice(index, 1);
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  displayWatchedMovies();
}
function markAsWatched(index) {
  const movie = watchlist[index];
  watchedMovies.push(movie);
  watchlist.splice(index, 1);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  displayWatchlist();
  displayWatchedMovies();
}
displayWatchlist();
displayWatchedMovies();
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.history.back();
});
