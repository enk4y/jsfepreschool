const track = document.querySelector('.track');
const trackThumbnail = document.querySelector('.track-thumbnail');
const playerBackground = document.querySelector('.player__background');
const trackTitle = document.querySelector('.track-title');
const trackArtist = document.querySelector('.track-artist');

const playPauseButton = document.querySelector('.play-pause');
const previousButton = document.querySelector('.previous-track');
const nextButton = document.querySelector('.next-track');

const audioSlider = document.querySelector('.audio-slider');
const currentTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');

let isPlay = false;
let playNum = 0;
let updateTimer;

let context;
let analyzer;
let source;
let array;
const playerContainerStyle = document.querySelector('.player__container').style;

const trackList = [
	{
		title: "Don't Hurt Yourself",
		artist: 'Beyonce',
		image: 'assets/img/lemonade.png',
		path: 'assets/audio/beyonce.mp3',
	},
	{
		title: "Don't Start Now",
		artist: 'Dua Lipa',
		image: 'assets/img/dontstartnow.png',
		path: 'assets/audio/dontstartnow.mp3',
	},
	{
		title: 'The Unforgiven',
		artist: 'Metallica',
		image: 'assets/img/unforgiven.jpg',
		path: 'assets/audio/unforgiven.mp3',
	},
];

playPauseButton.addEventListener('click', playPauseTrack);
previousButton.addEventListener('click', previousTrack);
nextButton.addEventListener('click', nextTrack);
track.addEventListener('ended', nextTrack);
audioSlider.addEventListener('change', updateProgressValue);
audioSlider.addEventListener('input', changeProgressValue);

function loadTrack(trackIndex) {
	track.src = trackList[trackIndex].path;
	track.load();

	trackThumbnail.src = trackList[trackIndex].image;
	playerBackground.src = trackList[trackIndex].image;

	trackArtist.innerHTML = trackList[trackIndex].artist;
	trackTitle.innerHTML = trackList[trackIndex].title;
}

function playPauseTrack() {
	if (!context) {
		preparation();
	}
	if (!isPlay) playTrack();
	else pauseTrack();
}

function playTrack() {
	if (!context) {
		preparation();
	}
	track.play();
	isPlay = true;
	loop();

	playPauseButton.src = 'assets/icons/pause.png';
	trackThumbnail.style.transform = 'scale(1.15)';
}

function pauseTrack() {
	track.pause();
	isPlay = false;

	playPauseButton.src = 'assets/icons/play.png';
	trackThumbnail.style.transform = 'scale(1.03)';
}

function nextTrack() {
	if (playNum < trackList.length - 1) {
		playNum++;
	} else {
		playNum = 0;
	}

	loadTrack(playNum);
	playTrack();
}

function previousTrack() {
	if (playNum > 0) {
		playNum--;
	} else {
		playNum = trackList.length - 1;
	}

	loadTrack(playNum);
	playTrack();
}

function updateProgressValue() {
	audioSlider.max = track.duration;
	audioSlider.value = track.currentTime;
	currentTime.innerHTML = formatTime(track.currentTime);
	totalDuration.innerHTML = formatTime(track.duration);
}

setInterval(updateProgressValue, 500);

function formatTime(seconds) {
	let min = Math.floor(seconds / 60);
	let sec = Math.floor(seconds - min * 60);
	if (sec < 10) {
		sec = `0${sec}`;
	}
	return `${min}:${sec}`;
}

function changeProgressValue() {
	track.currentTime = audioSlider.value;
}

function preparation() {
	context = new AudioContext();
	analyzer = context.createAnalyser();
	source = context.createMediaElementSource(track);
	source.connect(analyzer);
	analyzer.connect(context.destination);
	loop();
}

function loop() {
	if (isPlay) {
		window.requestAnimationFrame(loop);
	}
	array = new Uint8Array(analyzer.frequencyBinCount);
	analyzer.getByteFrequencyData(array);
	playerContainerStyle.boxShadow = ` 0 0 ${array[40] - 100}px rgb(193, 255, 6)`;
}

console.log(
	'Score: 60 / 60 \n' +
		'- Вёрстка (10)\n' +
		'  - [x] вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека (5)\n' +
		'  - [x] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс (5)\n' +
		'- Кнопка Play/Pause (10)\n' +
		'  - [x] есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека (5)\n' +
		'  - [x] внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек (5)\n' +
		'- При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый (10)\n' +
		'- При смене аудиотрека меняется изображение - обложка аудиотрека (10)\n' +
		'- Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека (10)\n' +
		'- Отображается продолжительность аудиотрека и его текущее время проигрывания (10)'
);
