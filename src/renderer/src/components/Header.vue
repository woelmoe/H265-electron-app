<template>
  <div class="header">
    <div class="header__title">СтилЖира</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: $header-height;
  background-color: $blue-color-1;

  display: flex;
  align-items: center;
  justify-content: left;

  &__title {
    height: 100%;
    margin-left: 10rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
