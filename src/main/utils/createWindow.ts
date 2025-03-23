import { BrowserWindow, shell } from 'electron'
import path, { join } from 'path'
import icon from '../../../resources/icon.png?asset'

export async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      sandbox: false,
      devTools: import.meta.env.DEV,
      nodeIntegration: true, // Включает Node.js API в рендерере
      contextIsolation: false // Отключает изоляцию контекста
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  await mainWindow.loadFile(path.join(__dirname, 'static/index.html'))
  // if (import.meta.env.DEV) {
  //   await mainWindow.loadURL('http://localhost:5173')
  // } else {
  //   await mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  // }

  mainWindow.webContents.on('did-fail-load', () => {
    console.log('WINDOW did-fail-load ERROR OCCURRED')
  })
}
