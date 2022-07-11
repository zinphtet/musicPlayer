const prevBtn = document.querySelector('.fa-backward');
const nextBtn = document.querySelector('.fa-forward');

const curTime = document.querySelector('.current_time');
const finalTime = document.querySelector('.final_time');

const songTitle = document.querySelector('.song_title');
const Singer = document.querySelector('.singer');

const coverImage = document.querySelector('img');

const proBar = document.querySelector('.progress');
const innerProBar = document.querySelector('.inner_progress');

const music = document.querySelector('audio');

const allSongs = [
	{
		title: 'Si - - -',
		singer: 'Wine Wine',
		src: 'WineWine_2.mp3',
		imgSrc: 'jacinto-2.jpg',
	},
	{
		title: ' Nga Ye La Min',
		singer: 'Lay Phyu',
		src: 'LayPhyu_1.mp3',
		imgSrc: 'jacinto-3.jpg',
	},
	{
		title: 'Tut Hnine me yatanar',
		singer: 'Htoo Eain Thin',
		src: 'HtooEainThin_1.mp3',
		imgSrc: 'metric-1.jpg',
	},
	{
		title: 'Ta Nay Tot',
		singer: 'G Latt',
		src: 'GLatt_1.mp3',
		imgSrc: 'jacinto-1.jpg',
	},
	{
		title: 'Shin Than Nay Ml',
		singer: 'Nyi Min Khanig',
		src: 'NyiMinKhaing_1.mp3',
		imgSrc: 'metric-1.jpg',
	},
];

//State Variable
let playState = false;
let curSongIndex = 0;
//Functions
const playSong = function () {
	playBtn.className = 'fas fa-pause';
	music.play();
	playState = true;
};
const pauseSong = function () {
	playBtn.className = 'fas fa-play';
	music.pause();
	playState = false;
};
const toMusicNumberFormat = function (duration) {
	let [min, sec] = (duration / 60).toFixed(2).split('.');
	sec = ((Number(sec) / 100) * 60).toFixed(0).padStart(2, '0');
	return `${min} : ${sec}`;
};
const loadSong = function (curMusic) {
	const { title, singer, src, imgSrc } = allSongs[curMusic];
	songTitle.textContent = title;
	Singer.textContent = singer;
	music.src = `./music/${src}`;
	coverImage.src = `./img/${imgSrc}`;
};
const loadAndPlay = function (index) {
	loadSong(index);
	playSong();
};
const nextSong = function () {
	curSongIndex + 1 < allSongs.length
		? loadAndPlay(++curSongIndex)
		: loadAndPlay((curSongIndex = 0));
};
const prevSong = function () {
	curSongIndex > 0
		? loadAndPlay(--curSongIndex)
		: loadAndPlay((curSongIndex = allSongs.length - 1));
};
//Event Listeners
playBtn.addEventListener('click', function () {
	playState ? pauseSong() : playSong();
});
music.onloadeddata = function () {
	finalTime.textContent = `${toMusicNumberFormat(music.duration)}`;
	curTime.textContent = `${toMusicNumberFormat(music.currentTime)}`;
};
music.addEventListener('timeupdate', (e) => {
	curTime.textContent = `${toMusicNumberFormat(e.target.currentTime)}`;
	const percent = (e.target.currentTime / e.target.duration) * 100;
	innerProBar.style.width = `${percent}` + '%';
});

proBar.addEventListener('click', function (e) {
	console.log((e.offsetX / 280) * 100);
	innerProBar.style.width = `${(e.offsetX / 280) * 100}` + '%';
	music.currentTime = (e.offsetX / 280) * music.duration;
});

music.addEventListener('ended', nextSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
////Initilization
function init() {
	loadSong(curSongIndex);
}
init();
