const { ipcRenderer } = require('electron')
const { Socket } = require('net')

// const canvas = document.getElementById('video-canvas')
// const ctx = canvas.getContext('2d')

// const socketPath = '/tmp/video_player.sock'
// const socket = new Socket()

// socket.connect(socketPath, () => {
//   console.log('Connected to Rust process')
// })

// socket.on('data', (data) => {
//   const frame = new Uint8Array(data)
//   const image = new ImageData(
//     new Uint8ClampedArray(frame),
//     canvas.width,
//     canvas.height
//   )
//   ctx.putImageData(image, 0, 0)
// })

// socket.on('error', (err) => {
//   console.error('Socket error:', err)
// })

// store.parseTasks()
const videoElement = document.createElement('video')
const canPlayH265 = videoElement.canPlayType(
  'video/mp4; codecs="hev1.1.6.L93.B0"'
)
console.log(!!canPlayH265)

// Проверяем поддержку формата MP4
const canPlayMP4 = videoElement.canPlayType('video/mp4')
console.log(canPlayMP4) // "probably", "maybe" или ""

// Проверяем поддержку формата WebM
const canPlayWebM = videoElement.canPlayType('video/webm')
console.log(canPlayWebM) // "probably", "maybe" или ""

// Проверяем поддержку формата Ogg
const canPlayOgg = videoElement.canPlayType('video/ogg')
console.log(canPlayOgg) // "probably", "maybe" или ""

const canPlayMP4WithCodec = videoElement.canPlayType(
  'video/mp4; codecs="avc1.64001e, mp4a.40.2"'
)
console.log(canPlayMP4WithCodec) // "probably", "maybe" или ""
