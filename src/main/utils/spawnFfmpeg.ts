import { exec } from 'child_process'

const { spawn } = require('child_process')

export function spawnFfmpeg(ffpmpegPath: string, args: string[]) {
  console.log(ffpmpegPath, args)

  const rustProcess = spawn(ffpmpegPath, args)

  rustProcess.stdout.on('data', (data: unknown) => {
    console.log('Received frame:', data.toString())
    // Отображение кадра на <canvas>
  })
  rustProcess.stderr.on('data', (data: unknown) => {
    console.log(data.toString())
  })
  rustProcess.on('error', (error: unknown) => {
    console.log(error.toString())
  })
}
