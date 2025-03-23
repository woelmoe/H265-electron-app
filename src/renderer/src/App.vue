<template>
  <video></video>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

function h254Cnavas() {
  const canvas = document.getElementById('video-canvas')
  const ctx = canvas.getContext('2d')

  function drawFrame(frame) {
    const image = new Image()
    image.src = URL.createObjectURL(new Blob([frame], { type: 'image/jpeg' }))
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    }
  }
}

onMounted(() => {
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
})
</script>

<style scoped></style>
