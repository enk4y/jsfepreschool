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
	if (!isPlay) playTrack();
	else pauseTrack();
}

function playTrack() {
	track.play();
	isPlay = true;

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
