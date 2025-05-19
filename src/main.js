const { app, ipcMain, BrowserWindow } = require("electron");
const path = require('path');
const myTimer = require(path.join(__dirname, "timer.js"));
// TODO: Import the autoUpdater from electron-updater
// const { autoUpdater } = require('electron-updater');
// Optional: Import electron-log for better logging
// const log = require('electron-log');
let win;

// TODO: Configure logging (optional but recommended)
// log.transports.file.level = 'info';
// autoUpdater.logger = log;
// log.info('App starting...');

const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, "bridge.js")
		}
	});

	win.loadFile(path.join(__dirname, "index.html"));
	//win.webContents.openDevTools();
};

app.whenReady().then(() => {
	createWindow();
	
	// TODO: Check for updates after app is initialized
	// autoUpdater.checkForUpdatesAndNotify();
	
	// TODO: Optional - Set up periodic update checks
	// setInterval(() => {
	//     autoUpdater.checkForUpdatesAndNotify();
	// }, 60 * 60 * 1000); // Check every hour

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Closes the app on Windows and Linux when closing the window
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

ipcMain.on('toggle-toast-notification', (event, value) => {
	myTimer.SetToastNotification(value);
});

ipcMain.on('toggle-play-sound', (event, value) => {
	myTimer.SetPlaySound(value);
});

ipcMain.on('toggle-always-on-top', (event, value) => {
	console.log("made it in");
	console.log(value);
	win.setVisibleOnAllWorkspaces(value, { visibleOnFullScreen: value });
	win.setAlwaysOnTop(value, "floating"); // "floating" requires for MacOS
	win.setFullScreenable(!value);
	// Below statement completes the flow
	win.moveTop();
});

ipcMain.on('process-input', (event, inputString) => {
	myTimer.Run(inputString);
});

myTimer.emitter.on('timer-update', (value) => {
	win.webContents.send("timer-update", value);
});

// TODO: Add autoUpdater event handlers below
/*
autoUpdater.on('checking-for-update', () => {
    // Log or notify that app is checking for update
});

autoUpdater.on('update-available', (info) => {
    // Log or notify that an update is available
});

autoUpdater.on('update-not-available', (info) => {
    // Log that no update is available
});

autoUpdater.on('error', (err) => {
    // Handle errors during update process
});

autoUpdater.on('download-progress', (progressObj) => {
    // Handle download progress updates
});

autoUpdater.on('update-downloaded', (info) => {
    // Notify that update is ready to install
    // Optionally prompt user to restart app
    // autoUpdater.quitAndInstall();
});
*/
