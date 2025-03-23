<template>
  <textarea v-model="showModal" class="app-text-field" />
</template>

<script setup lang="ts">
const showModal = defineModel<string>({ default: '', required: true })
</script>

<style scoped lang="scss">
.app-text-field {
  width: calc(100% - 2 * 16rem);
  padding: 8rem 16rem;
  border: 1rem solid $gray-color-1;
  border-radius: 8rem;
}
</style>
