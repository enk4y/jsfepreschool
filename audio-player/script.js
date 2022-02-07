const playPauseButton = document.querySelector('#play-pause');

const song = document.querySelector('#song');
const thumbnail = document.querySelector('#thumbnail');

playPauseButton.addEventListener('click', playPause);

let playing = true;

function playPause() {
	if (playing) {
		playPauseButton.src = 'assets/icons/pause.png';
		thumbnail.style.transform = 'scale(1.15)';

		song.play();
		playing = false;
	} else {
		playPauseButton.src = 'assets/icons/play.png';
		thumbnail.style.transform = 'scale(1)';

		song.pause();
		playing = true;
	}
}

const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title');
const background = document.querySelector('#background');

let songIndex = 0;
const songs = ['assets/audio/beyonce.mp3', 'assets/audio/dontstartnow.mp3'];
const thumbnails = ['assets/img/lemonade.png', 'assets/img/dontstartnow.png'];
const songArtists = ['Beyonce', 'Dua Lipa'];
const songTitles = ["Don't Hurt Yourself", "Don't Start Now"];
const nextSongButton = document.querySelector('#next-song');
const previousSongButton = document.querySelector('#previous-song');

nextSongButton.addEventListener('click', nextSong);
previousSongButton.addEventListener('click', previousSong);

song.addEventListener('ended', nextSong);

function nextSong() {
	songIndex++;
	if (songIndex > 1) {
		songIndex = 0;
	}

	song.src = songs[songIndex];
	thumbnail.src = thumbnails[songIndex];
	background.src = thumbnails[songIndex];

	songArtist.innerHTML = songArtists[songIndex];
	songTitle.innerHTML = songTitles[songIndex];

	playing = true;
	playPause();
}

function previousSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = 1;
	}

	song.src = songs[songIndex];
	thumbnail.src = thumbnails[songIndex];
	background.src = thumbnails[songIndex];

	songArtist.innerHTML = songArtists[songIndex];
	songTitle.innerHTML = songTitles[songIndex];

	playing = true;
	playPause();
}

const progressBar = document.querySelector('#progress-bar');
progressBar.addEventListener('change', updateProgressValue);
progressBar.addEventListener('input', changeProgressBar);

function updateProgressValue() {
	progressBar.max = song.duration;
	progressBar.value = song.currentTime;
	document.querySelector('.currentTime').innerHTML = formatTime(
		song.currentTime
	);
	document.querySelector('.durationTime').innerHTML = formatTime(song.duration);
}

function formatTime(seconds) {
	let min = Math.floor(seconds / 60);
	let sec = Math.floor(seconds - min * 60);
	if (sec < 10) {
		sec = `0${sec}`;
	}
	return `${min}:${sec}`;
}

setInterval(updateProgressValue, 1000);

function changeProgressBar() {
	song.currentTime = progressBar.value;
}
