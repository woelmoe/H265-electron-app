import { app, BrowserWindow } from 'electron'
import { optimizer } from '@electron-toolkit/utils'
import 'dotenv/config'
import { registerHotkeys } from './utils/registerHotkeys'
import { createWindow } from './utils/createWindow'

app.whenReady().then(async () => {
  registerHotkeys()

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  await createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
