const myTimer = require('./timer.js');
const io = require('./io.js');

const dispatch = {
	Setup(ipcMain, win) {
		ipcMain.on('process-input', (event, inputString) => {
			myTimer.Run(inputString);
		});

		ipcMain.on('timer-stop', (event) => {
			myTimer.StopTimer();
		});

		myTimer.emitter.on('timer-update', (value) => {
			win.webContents.send("timer-update", value);
		});

		ipcMain.on('toggle-play-sound', (event, value) => {
			myTimer.SetPlaySound(value);
			io.settings.play_sound = value;
			io.Write();
		});

		ipcMain.on('toggle-toast-notification', (event, value) => {
			myTimer.SetToastNotification(value);
			console.log("value " + value);
			io.settings.toast_notification = value;
			io.Write();
		});

		ipcMain.on('toggle-always-on-top', (event, value) => {
			win.setVisibleOnAllWorkspaces(value, { visibleOnFullScreen: value });
			win.setAlwaysOnTop(value, "floating"); // "floating" requires for MacOS
			win.setFullScreenable(!value);
			// Below statement completes the flow
			win.moveTop();
			io.settings.always_on_top = value;
			io.Write();
		});

		ipcMain.on('set-custom-sound', (event, value) => {
			console.log(value);
			io.settings.custom_sound_path = value;
			io.Write();
		});
	},
	Read()
	{
		io.Read();
	},
	LoadSettings(win)
	{
		win.webContents.send('load-settings', io.settings);
	},
	Write()
	{
		io.Write();
	}
};

module.exports = dispatch;
