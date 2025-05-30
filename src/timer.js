const sound = require('sound-play');
const path = require('path');
const { DateTime, Duration } = require('luxon');
const EventEmitter = require('events');
const emitter = new EventEmitter();
const { app, Notification } = require('electron');

let seconds = 0;
let isEnabled_toast = true;
let isEnabled_sound = true;
let soundFilepath = path.join(app.getAppPath(), "assets", "sounds", "marimba_tone_007.wav");

function SetToastNotification(value)
{
	isEnabled_toast = value;
}

function SetPlaySound(value)
{
	isEnabled_sound = value;
}

function Run(inputString)
{
	var parsedTime = ProcessInput(inputString);
	seconds = GetTimeDifference(parsedTime);
	UpdateTimer();
}

function ProcessInput(inputString) {
	var time = DateTime.fromFormat(inputString, "h:mm", {});
	return time;
}

function GetTimeDifference(parsedTime)
{
	return parsedTime.diff(DateTime.now()).as('seconds');
}

function StopTimer() {
	seconds = 0;
}

function UpdateTimer() {
	// Update the count down every second
	var x = setInterval(function() {
		seconds -= 1;

		let time = Duration.fromObject({ seconds: seconds }).toFormat('hh\'h\':mm\'m\':ss\'s\'');

		// Display the result in the element with id="demo"
		emitter.emit('timer-update', time);

		if (seconds <= 0) {
			clearInterval(x);
			emitter.emit('timer-update', "EXPIRED");

			if (isEnabled_sound)
			{
				sound.play(soundFilepath);
			}

			if (isEnabled_toast)
			{
				new Notification({
					title: "Session Monitor",
					body: "Timer complete!"
				}).show()
			}
		}
	}, 1000);
}

module.exports = { Run, StopTimer, SetToastNotification, SetPlaySound, emitter}
