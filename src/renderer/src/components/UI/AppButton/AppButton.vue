<template>
  <button
    class="app-button"
    :class="{
      clear: type === 'clear'
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type ButtonType = 'default' | 'clear'
interface IProps {
  type?: ButtonType
}
const props = defineProps<IProps>()
</script>

<style scoped lang="scss">
.app-button {
  background-color: $blue-color-1;
  padding: 8rem 24rem;
  border-radius: 6rem;
  color: $color-white;
}

.clear {
  background-color: transparent;
  color: $black-color;
}
</style>
