<template>
  <video></video>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore } from '@/stores/main'

const store = useMainStore()

onMounted(() => {
  // store.parseTasks()
  const video = document.createElement('video')
  console.log(video.canPlayType('video/mp4; codecs="hev1.1.6.L93.B0"'))
})
</script>

<style scoped></style>
