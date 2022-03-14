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

console.log(
	'Score: 60 / 60 \n' +
		'- Вёрстка (10)\n' +
		'  - [x]на странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма. Также на карточке может быть другая информация, которую предоставляет API, например, описание фильма, его рейтинг на IMDb и т.д (5)\n' +
		'  - [x] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс (5)\n' +
		'- При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными (10)\n' +
		'- Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API (10)\n' +
		'- Поиск (30)\n' +
		'  - [x] при открытии приложения курсор находится в поле ввода (5)\n' +
		'  - [x] есть placeholder (5)\n' +
		'  - [x] автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) (5)\n' +
		'  - [x] поисковый запрос можно отправить нажатием клавиши Enter (5)\n' +
		'  - [x] после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода (5)\n' +
		'  - [x] в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder (5)'
);
