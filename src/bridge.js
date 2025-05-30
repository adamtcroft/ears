const { contextBridge, ipcRenderer, webUtils } = require('electron');

contextBridge.exposeInMainWorld('timerAPI', {
	onTimerUpdate: (onTimerUpdate) => ipcRenderer.on('timer-update', (event, value) => onTimerUpdate(event, value)),
	onTimerStop: () => ipcRenderer.send('timer-stop'),
	processInput: (callback) => ipcRenderer.send('process-input', callback)
})

contextBridge.exposeInMainWorld('settingsAPI', {
	onToggle_ToastNoticiation: (callback) => ipcRenderer.send('toggle-toast-notification', callback),
	onToggle_PlaySound: (callback) => ipcRenderer.send('toggle-play-sound', callback),
	onToggle_AlwaysOnTop: (callback) => ipcRenderer.send('toggle-always-on-top', callback),
	onSet_CustomSound: (file) => ipcRenderer.send('set-custom-sound', webUtils.getPathForFile(file)),
	loadSettings: (loadSettings) => ipcRenderer.on('load-settings', (event, value) => loadSettings(event, value))
})

contextBridge.exposeInMainWorld('updateAPI', {
	onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback)
})
