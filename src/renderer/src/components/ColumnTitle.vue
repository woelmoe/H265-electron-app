<template>
  <div class="column-title">{{ typeToTitle }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TaskType } from '@/assets/interfaces/interface'

interface IProps {
  title: TaskType
}
const props = defineProps<IProps>()
const typeToTitle = computed(() => {
  switch (props.title) {
    case TaskType.todo:
      return 'Надо сделать'
    case TaskType.inWork:
      return 'В работе'
    case TaskType.finished:
      return 'Выполнено'
  }
})
</script>

<style scoped lang="scss">
.column-title {
  width: 100%;
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14rem;
  font-weight: bold;
  padding-left: calc(2 * $padding);
  color: $black-color;
}
</style>
