<template>
  <component :is="route.meta.layoutComponent">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
