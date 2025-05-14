const { app, ipcMain, BrowserWindow } = require("electron");
const myTimer = require("./timer.js");
const path = require('path');
let win;

const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, 'bridge.js')
		}
	});

	win.loadFile("index.html");
	//win.webContents.openDevTools();
};

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Closes the app on Windows and Linux when closing the window
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

ipcMain.on('process-input', (event, inputString) => {
	myTimer.Run(inputString);
});

myTimer.emitter.on('timer-update', (value) => {
	win.webContents.send("timer-update", value);
});
