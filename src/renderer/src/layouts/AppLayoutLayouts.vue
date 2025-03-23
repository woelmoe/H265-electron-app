<template>
  <div class="app-layout-layouts">
    <SideBar />
    <Header />
    <div class="app-layout-layouts__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import SideBar from '@/components/SideBar.vue'
</script>

<style scoped lang="scss">
.app-layout-layouts {
  &__wrapper {
    position: relative;
    left: 60rem;
    top: 60rem;
  }
}
</style>
