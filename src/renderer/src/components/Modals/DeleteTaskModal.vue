<template>
  <div class="delete-task-modal__background" @keyup.esc="emit('decline')"></div>
  <div class="delete-task-modal">
    <div class="delete-task-modal__title">Удалить задачу?</div>
    <div class="delete-task-modal__content">
      <AppButton type="clear" @click="emit('decline')">Отмена</AppButton>
      <AppButton @click="emit('accept')">Удалить</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/UI/AppButton/AppButton.vue'
import { onUnmounted } from 'vue'

interface IEmit {
  (e: 'decline'): void
  (e: 'accept'): void
}
const emit = defineEmits<IEmit>()
function onKeyUp(e: KeyboardEvent) {
  const { key } = e
  if (key === 'Escape') emit('decline')
}
addEventListener('keyup', onKeyUp)

onUnmounted(() => {
  removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped lang="scss">
$height: 120rem;
$padding-title: 16rem;
.delete-task-modal {
  position: fixed;
  inset: 0;
  margin: auto;
  width: 300rem;
  height: $height;
  background-color: $color-white;
  border-radius: 6rem;

  &__background {
    position: fixed;
    inset: 0;
    background-color: black;
    opacity: 0.5;
  }

  &__title {
    height: 40rem;
    width: calc(100% - $padding-title);
    border-bottom: 1rem solid $black-color;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: $padding-title;
    color: $black-color;
    font-size: 14rem;
    font-weight: bold;
  }

  &__content {
    height: calc($height - 40rem);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24rem;
  }
}
.delete-task-modal::after {
  pointer-events: none;
}
</style>
