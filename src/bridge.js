const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('timerAPI', {
	onTimerUpdate: (callback) => ipcRenderer.on('timer-update', callback),
	processInput: (callback) => ipcRenderer.send('process-input', callback)
})

