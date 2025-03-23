const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { spawn } = require('child_process')

let mainWindow
let rustProcess

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'static/index.html'))
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', () => {
  createWindow()

  // Запуск Rust-процесса
  const ffpmpegPath = path.join(__dirname, 'ffmpeg', 'rust_ffmpeg_example')
  rustProcess = spawn(ffpmpegPath, [], {
    stdio: ['pipe', 'pipe', 'pipe']
  })

  // Обработка данных из Rust-процесса
  rustProcess.stdout.on('data', (data) => {
    const frameData = data.toString() // Получаем кадр в виде base64
    mainWindow.webContents.send('video-frame', frameData)
  })

  rustProcess.stderr.on('data', (data) => {
    console.error(`Rust stderr: ${data}`)
  })

  rustProcess.on('close', (code) => {
    console.log(`Rust process exited with code ${code}`)
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// IPC для взаимодействия с Rust
ipcMain.on('play-video', (event, filePath) => {
  if (rustProcess) {
    rustProcess.stdin.write(`${filePath}\n`) // Передаем путь к видео в Rust
  }
})
