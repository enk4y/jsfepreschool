const URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ddf25d4ff1aa2b1f634cbe9aa62075d9';
const SEARCH =
	'https://api.themoviedb.org/3/search/movie?api_key=ddf25d4ff1aa2b1f634cbe9aa62075d9&query="';
const IMAGE = 'https://image.tmdb.org/t/p/w1280';

const moviesContent = document.querySelector('.movies__body');
const form = document.querySelector('.form');
const search = document.querySelector('.form__search');

form.addEventListener('submit', searchData);

async function getData(url) {
	const res = await fetch(url);
	const data = await res.json();
	showData(data.results);
}

getData(URL);

function searchData(event) {
	event.preventDefault();
	const searchString = search.value;
	if (searchString && searchString !== '') {
		getData(SEARCH + searchString);
	} else {
		window.location.reload();
	}
}

function showData(movies) {
	moviesContent.innerHTML = '';
	movies.forEach((movie) => {
		const movieItem = document.createElement('div');
		movieItem.classList.add('movie');
		movieItem.innerHTML = `
		<img class="movie__image"
			src="${IMAGE + movie.poster_path}" 
			alt="${movie.title}">
		<div class="movie__data">
			<h3 class="movie__title">${movie.title}</h3>
			<span class="movie__mark ${getMarkStyle(movie.vote_average)}">${
			movie.vote_average
		}</span>
		</div>
		<div class="movie__overview">
			<h3 class="movie__subtitle">Overview</h3>
			<p class="movie__description">${movie.overview}</p>
		</div>
		`;
		moviesContent.appendChild(movieItem);
	});
}

const getMarkStyle = (vote) =>
	vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red';
