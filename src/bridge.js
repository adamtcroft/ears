const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('timerAPI', {
	onTimerUpdate: (callback) => ipcRenderer.on('timer-update', callback),
	processInput: (callback) => ipcRenderer.send('process-input', callback)
})

contextBridge.exposeInMainWorld('settingsAPI', {
	onToggle_ToastNoticiation: (callback) => ipcRenderer.send('toggle-toast-notification', callback),
	onToggle_PlaySound: (callback) => ipcRenderer.send('toggle-play-sound', callback)
})
