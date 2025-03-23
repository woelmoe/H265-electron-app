import { app, BrowserWindow } from 'electron'
import { optimizer } from '@electron-toolkit/utils'
import 'dotenv/config'
import { registerHotkeys } from './utils/registerHotkeys'
import { createWindow } from './utils/createWindow'
import path from 'path'
import { spawnFfmpeg } from './utils/spawnFfmpeg'

// const ffmpegPath = path.join(__dirname, 'ffmpeg', 'ffmpeg_h256')
const ffmpegPath = path.join(__dirname, 'ffmpeg', 'rust_ffmpeg_example')

console.log(ffmpegPath)

app.commandLine.appendSwitch(ffmpegPath)

app.commandLine.appendSwitch('ignore-gpu-blacklist') // Игнорировать черный список GPU
app.commandLine.appendSwitch('enable-accelerated-video-decode') // Включить аппаратное декодирование

app.whenReady().then(async () => {
  registerHotkeys()

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  await createWindow()
  spawnFfmpeg(ffmpegPath, [])

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
