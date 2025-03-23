const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  playVideo: (filePath) => ipcRenderer.send('play-video', filePath),
  onVideoFrame: (callback) => ipcRenderer.on('video-frame', callback)
})
