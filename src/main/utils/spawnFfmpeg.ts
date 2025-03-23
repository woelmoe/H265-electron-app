const { spawn } = require('child_process')

function spawnFfmpeg(ffpmpegPath: string, args: string[]) {
  const rustProcess = spawn(ffpmpegPath, args)

  rustProcess.stdout.on('data', (data: unknown) => {
    console.log('Received frame:', data)
    // Отображение кадра на <canvas>
  })
}
