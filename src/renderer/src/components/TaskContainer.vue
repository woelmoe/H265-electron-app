<template>
  <div class="task-container">
    <TaskCard
      v-for="item in filteredTaskList"
      :key="item.title"
      :task="item"
    ></TaskCard>
  </div>
</template>

<script setup lang="ts">
import TaskCard from '@/components/TaskCard.vue'
import { useMainStore } from '@/stores/main'
import { TaskType } from '@/assets/interfaces/interface'
import { computed } from 'vue'

interface IProps {
  type: TaskType
}
const props = defineProps<IProps>()
const store = useMainStore()

const filteredTaskList = computed(() => {
  if (!store.taskList.length) return []
  return store.taskList.filter((task) => task.type === props.type)
})
</script>

<style scoped lang="scss">
.task-container {
  width: 100%;
  height: fit-content;
  padding-bottom: $padding;

  display: flex;
  flex-direction: column;
  gap: $mini-padding;
}
</style>
