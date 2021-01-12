/*Get our elements*/

const player= document.querySelector('.player');
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = player.querySelector('.fullscreen');

/*Add the functionality */
let isClicked=false;

function togglePlay() {
	const method= video.paused ? 'play' : 'pause';
	video[method]();
	if(!video.paused){
		console.log(' i am here !');
		handleProgress();
	}
	
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent= icon;
	console.log('update the button');
}

function skip () {
	// console.log('skip function has been activated!');
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
	if(e.type == "change"){
		video[this.name] = this.value;
	}
	// if(!isClicked ) return;
	video[this.name] = this.value;
	// console.log(this.name);
}

function handleProgress() {
	const percent = (video.currentTime/ video.duration) * 100;
	// console.log(percent);
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
	if(e.type == "click" || isScrubClicked)
	{const prec= (e.offsetX/progress.offsetWidth) * 100;    // offsetWidth gives the entire width of the its element.
			const SetTime = (prec * video.duration)/100;
			// console.log(SetTime);
			video.currentTime= SetTime;
			/*console.log(e);*/ }
}

function enableFullscreen(e) {
	video.requestFullscreen();
}

/*Finally add the event listeners*/

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',togglePlay);

ranges.forEach(range => range.addEventListener('mousedown', (event) => {isClicked=true;}));
// ranges.forEach(range => range.addEventListener('mousedown', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mouseup', (event) => {isClicked=false;}));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

skipButtons.forEach(button => button.addEventListener('click', skip));

progress.addEventListener('click', scrub);

let isScrubClicked = false;
progress.addEventListener('mousedown', (event) => {isScrubClicked=true;}) 
progress.addEventListener('mouseup', (event) => {isScrubClicked=false;}) 
progress.addEventListener('mousemove', scrub);

fullScreenButton.addEventListener('click', enableFullscreen);