<template>
  <div class="app-tooltip">
    <div class="app-tooltip__title">{{ title }}</div>
    <div class="app-tooltip__arrow-shadow arrow"></div>
    <div class="app-tooltip__arrow arrow"></div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string
}
defineProps<IProps>()
</script>

<style scoped lang="scss">
.app-tooltip {
  position: relative;
  width: fit-content;
  height: fit-content;
  background-color: $color-white;
  border-radius: 16rem;
  padding: 8rem 8rem;
  box-shadow: $shadow;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &__title {
    font-size: 12rem;
  }

  &__arrow {
    background-color: $color-white;
    left: 10rem;
    bottom: -20rem;
    width: 60rem;
    height: 22rem;
  }

  &__arrow-shadow {
    bottom: -20rem;
    width: 60rem;
    height: 20rem;
    background-color: $shadow-color;
    left: 16rem;
    filter: blur(20rem);
  }
}

.arrow {
  position: absolute;
  clip-path: polygon(32% 0, 0% 100%, 100% 0);
  box-shadow: $shadow;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
