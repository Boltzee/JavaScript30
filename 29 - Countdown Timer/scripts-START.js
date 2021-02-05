let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endtime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer (seconds) {
	clearInterval(countdown); //clear all the existing timers 

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(Date.now() + seconds * 1000);
	// console.log(now, then);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now())/1000);
		// check if we need to stop it at the present moment 
		if(secondsLeft < 0){
			clearInterval(countdown);
			return; 
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds/60);
	const secs = seconds%60;
	const display = `${minutes}:${secs<10 ? '0' : '' }${secs}`;
	document.title= display;
	timerDisplay.textContent= display;
	// console.log(minutes, secs);
	// console.log(seconds);
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hours = end.getHours();
	const min = end.getMinutes();
	// console.log(hours, min);
	endtime.textContent= `Be back at ${hours}:${min}`;
}

function startTimer (e) {
	// console.log(this);
	const secs = parseInt(this.dataset.time);
	timer(secs);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e){
	e.preventDefault();
	const mins = this.minutes.value;
	// console.log(mins);
	this.reset();
	timer(mins * 60);
})