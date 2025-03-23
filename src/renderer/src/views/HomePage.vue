<template>
  <div
    class="home-page"
    :style="{
      width: tableWidth + 'rem'
    }"
  >
    <div class="home-page__colum-title-wrapper">
      <ColumnTitle v-for="item of columns" :key="item" :title="item" />
    </div>
    <div
      class="home-page__slasher"
      v-for="(column, index) in columns.length - 1"
      :style="{
        left: `${(index + 1) * ((tableWidth - 9) / 3)}rem`
      }"
      :key="column"
    ></div>
    <div class="home-page__scroll-wrapper">
      <div class="home-page__colum-task-wrapper">
        <div
          class="home-page__task-container"
          v-for="column in columns"
          :key="column"
          @dblclick="onDblClickColumn($event, column as TaskType)"
          @dragenter="onDragEnter(column as TaskType)"
        >
          <TaskContainer :type="column" />
          <Transition name="fade">
            <AppTooltip
              v-if="column === TaskType.todo && isTooltipActive"
              v-click-outside="hideTooltip"
              @click="hideTooltip"
              title="Чтобы создать таску, выполните двойное нажатие правой клавиши мыши в этой колонке"
              class="home-page__main-tooltip"
            />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskContainer from '@/components/TaskContainer.vue'
import ColumnTitle from '@/components/ColumnTitle.vue'
import { TaskType } from '@/assets/interfaces/interface'
import { useMainStore } from '@/stores/main'
import { RoutePaths, router } from '@/router'
import { nextTick, onMounted, ref, watch } from 'vue'
import AppTooltip from '@/components/UI/AppTooltip.vue'

const store = useMainStore()
const columns = Object.values(TaskType)

const tableWidth = 700

const isTooltipActive = ref(false)
function onDblClickColumn(e: Event, column: TaskType) {
  if (column === TaskType.todo) router.push({ name: RoutePaths.taskForm })
}

async function onDragEnter(column: TaskType) {
  await nextTick()
  if (!store.draggableTask) return
  store.draggableTask.type = column
}

function hideTooltip() {
  isTooltipActive.value = false
}

function checkTooltipActive() {
  if (store.taskList.length === 0) isTooltipActive.value = true
}
const unwatcher = watch(
  () => store.taskList.length,
  () => {
    checkTooltipActive()
    if (isTooltipActive.value || store.taskList.length !== 0) {
      unwatcher()
      isTooltipActive.value = false
    }
  }
)
onMounted(() => {
  checkTooltipActive()
})
</script>

<style scoped lang="scss">
$gap: 8rem;
.home-page {
  position: relative;
  height: calc(100vh - 50rem);

  &__colum-title-wrapper {
    display: flex;
    background-color: $gray-color-2;
    height: 60rem;
    border-bottom: 3rem solid white;
  }

  &__scroll-wrapper {
    overflow: auto;
    height: calc(100% - 150rem);
    background-color: $gray-color-2;
  }

  &__colum-task-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    width: 100%;
  }

  &__task-container {
    width: 100%;
    height: 100%;
  }

  &__slasher {
    position: absolute;
    top: 0;
    height: 100%;
    width: 3rem;
    background-color: #fff;
  }

  &__main-tooltip {
    position: absolute;
    width: 200rem;
    left: 150rem;
    top: 10rem;
  }
}
</style>
