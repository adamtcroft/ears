const { app, ipcMain, BrowserWindow } = require("electron");
const path = require('path');
const dispatch = require(path.join(__dirname, "dispatch.js"));
const { autoUpdater } = require('electron-updater');
let win;

const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, "bridge.js")
		}
	});

	dispatch.Read();
	win.loadFile(path.join(__dirname, "index.html"));

	win.webContents.on('did-finish-load', () => {
		console.log('Window loaded, sending settings and setting up IPC');
		dispatch.LoadSettings(win);
		dispatch.Setup(ipcMain, win);
	});
	
	// Open DevTools with options to reduce console noise
	//win.webContents.openDevTools();
};

autoUpdater.on("update-available", (info) => {
});

autoUpdater.on("update-not-available", (info) => {
	win.webContents.send("update-available", "yay, update!");
})

app.whenReady().then(() => {
	createWindow();
	//autoUpdater.autoDownload = false;
	//autoUpdater.forceDevUpdateConfig = true;
	//autoUpdater.checkForUpdates();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

});

// Closes the app on Windows and Linux when closing the window
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
