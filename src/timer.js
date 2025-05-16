const sound = require('sound-play');
const { DateTime, Duration } = require('luxon');
const EventEmitter = require('events');
const emitter = new EventEmitter();
const { Notification } = require('electron');

function Run(inputString)
{
	var parsedTime = ProcessInput(inputString);
	var difference = GetTimeDifference(parsedTime);
	updateTimer(difference);
}

function ProcessInput(inputString) {
	var time = DateTime.fromFormat(inputString, "h:mm", {});
	return time;
}

function GetTimeDifference(parsedTime)
{
	return parsedTime.diff(DateTime.now()).as('seconds');
}

function updateTimer(seconds) {
	// Update the count down every second
	var x = setInterval(function() {
		seconds -= 1;

		let time = Duration.fromObject({ seconds: seconds }).toFormat('hh\'h\':mm\'m\':ss\'s\'');

		// Display the result in the element with id="demo"
		emitter.emit('timer-update', time);

		if (seconds <= 0) {
			clearInterval(x);
			emitter.emit('timer-update', "EXPIRED");
			sound.play("/Users/adam/Music/SFX Database/Glitchmachines/VIMANA/VIMANA_SAMPLES/ARTIFACT_1/FundamentalRobotics1.wav", 0.3);
			new Notification({
				title: "Session Monitor",
				body: "Timer complete!"
			}).show()
		}
	}, 1000);
}

module.exports = { Run, emitter}
