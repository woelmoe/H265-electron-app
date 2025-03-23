<template>
  <div
    :title="tooltipTitle"
    class="task-card isDraggable"
    draggable="true"
    @contextmenu.prevent="onContextMenu"
    @dblclick="ondblclick"
    @dragstart="onDragStart"
    @dragend="onDrop"
  >
    <div class="task-card__wrapper">
      <div class="task-card__title">{{ task.title }}</div>
      <div class="task-card__content">{{ task.description }}</div>
    </div>
    <Teleport to="body">
      <DeleteTaskModal
        v-if="deleteModalActive"
        @accept="deleteTask"
        @decline="deleteModalActive = false"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ITask, TaskType } from '@/assets/interfaces/interface'
import { useMainStore } from '@/stores/main'
import DeleteTaskModal from '@/components/Modals/DeleteTaskModal.vue'
import { computed, ref } from 'vue'
import { RoutePaths, router } from '@/router'
import { useApi } from '@/use/API'

interface IProps {
  task: ITask
}
const props = defineProps<IProps>()
const store = useMainStore()
const api = useApi()

const tooltipTitle = computed(() => {
  switch (props.task.type) {
    case TaskType.todo:
      return 'Нажмите правую клавишу мыши для редактирования таски. Для создания новой таски используйте двойной клик'
    case TaskType.inWork:
      return 'Используйте двойной клик для редактирования таски'
    case TaskType.finished:
      return 'Используйте двойной клик для удаления таски'
  }
})

const deleteModalActive = ref(false)
function ondblclick() {
  switch (props.task.type) {
    case TaskType.todo:
      router.push({ name: RoutePaths.taskForm })
      break

    case TaskType.inWork:
      store.setTask({ ...props.task, editable: true })
      router.push({ name: RoutePaths.taskForm })
      break

    case TaskType.finished:
      deleteModalActive.value = true
      break
  }
}

function onContextMenu() {
  store.setTask({ ...props.task, editable: true })
  router.push({ name: RoutePaths.taskForm })
}

async function deleteTask() {
  const index = store.taskList.findIndex(
    (task) => task.title === props.task.title
  )
  await api.deleteTask(store.taskList[index].id)
  store.taskList.splice(index, 1)
}

function onDrop() {
  if (!store.draggableTask) return
  store.updateTask(store.draggableTask)
  store.setDraggableTask(null)
}

function onDragStart(_e: DragEvent) {
  store.setDraggableTask(props.task)
}
</script>

<style scoped lang="scss">
.task-card {
  width: calc(100% - 2 * $mini-padding);
  height: 97rem;
  padding: $mini-padding;
  cursor: grab;

  &__wrapper {
    min-height: 97rem;
    background-color: $color-white;
    padding: $padding $padding 0 0;
    overflow: hidden;
  }

  &__title {
    font-size: 14rem;
    padding-left: $padding;
    margin-bottom: $padding;
    color: $gray-color-3;
  }

  &__content {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $black-color;

    font-size: 12rem;
    height: calc(100% - 4 * $padding);
    padding-left: $padding;
  }
}
</style>
