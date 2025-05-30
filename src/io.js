const path = require("path");
const { app } = require("electron");
const fs = require("fs");
const DEFAULT_SETTINGS = {
	play_sound: true,
	toast_notification: true,
	always_on_top: false,
	custom_sound_path: null
};

const settings = { ...DEFAULT_SETTINGS }; // spread operator, for later Googling

let settingsDirectory = path.join(app.getPath('userData'));
let settingsPath = path.join(settingsDirectory, "settings.json");

function Write() {
	if (!fs.existsSync(settingsDirectory)) {
		fs.mkdirSync(settingsDirectory);
	}

	fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf8', (err) => {
		if (err)
		{
			console.error('Error writing settings file');
			return;
		}
	}
)};

function Read() {
	fs.readFile(settingsPath, 'utf8', (err, data) => {
		if (err)
		{
			if (err.code === 'ENOENT')
			{
				Write();
			}
			else
			{
				console.error('Error reading settings file');
			}
			return;
		}
	
		let settingsFromFile = JSON.parse(data);
		Object.assign(settings, settingsFromFile);
	}
)};

module.exports = { settings, Write, Read }
