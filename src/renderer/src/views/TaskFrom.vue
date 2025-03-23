<template>
  <div class="task-form" @keyup.esc="onCancel">
    <div class="task-form__description">
      <AppInput v-model="description" placeholder="Тема" v-focus="true" />
    </div>
    <div class="task-form__content">
      <AppTextField
        v-model="content"
        placeholder="Описание"
        class="task-form__content-field"
      />
    </div>
    <div class="task-form__button-wrapper">
      <AppButton variant="clear" @click="onCancel">Отмена</AppButton>
      <AppButton @click="onAccept">Готово</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/components/UI/AppInput/AppInput.vue'
import AppButton from '@/components/UI/AppButton/AppButton.vue'
import { useMainStore } from '@/stores/main'
import { ITaskNoId, TaskType } from '@/assets/interfaces/interface'
import { RoutePaths, router } from '@/router'
import AppTextField from '@/components/UI/AppInput/AppTextField.vue'

const store = useMainStore()

console.log(store.editableTask)
const description = ref(store.editableTask?.description ?? '')
const content = ref(store.editableTask?.content ?? '')

function onAccept() {
  const task: ITaskNoId = {
    type: TaskType.todo,
    content: content.value,
    description: description.value
  }
  if (store.editableTask) {
    store.updateTask({
      title: store.editableTask.title,
      type: store.editableTask.type,
      description: description.value,
      content: content.value
    })
    store.editableTask.editable = false
  } else {
    store.addTask(task)
  }
  router.push({ name: RoutePaths.home })
}

function onCancel() {
  router.push({ name: RoutePaths.home })
  if (store.editableTask) store.editableTask.editable = false
}
</script>

<style scoped lang="scss">
$text-width: 700rem;

.task-form {
  padding: $padding;
  height: 700rem;

  &__description {
    width: $text-width;
    height: 60rem;
  }

  &__content {
    width: $text-width;
  }

  &__content-field {
    max-height: 500rem;
    max-width: calc($text-width - 4 * $padding);
    min-height: 50rem;
    min-width: calc($text-width - 4 * $padding);
  }

  &__button-wrapper {
    height: 60rem;
    width: $text-width;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: calc(3 * $padding);
  }
}
</style>
