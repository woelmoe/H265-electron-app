import { defineStore } from 'pinia'
import { ITask, ITaskNoId } from '@/assets/interfaces/interface'
import { useTools } from '@/use/tools'
import { useApi } from '@/use/API'

const api = useApi()
const { initTaskTitle } = useTools()

export const useMainStore = defineStore('main', {
  state: () => ({
    taskList: <ITask[]>[],
    draggableTask: <ITaskNoId | null>null
  }),
  getters: {
    editableTask(state) {
      return state.taskList.length
        ? state.taskList.find((item) => item.editable)
        : undefined
    }
  },
  actions: {
    async addTask(taskForm: ITaskNoId) {
      const response = await api.addTask(taskForm)
      this.taskList.push(response.task)
    },
    setDraggableTask(task: ITask | null) {
      this.draggableTask = task
    },
    setTask(task: ITask) {
      const foundTask = this.taskList.find((item) => item.title === task.title)
      if (!foundTask) return
      foundTask.id = task.id
      foundTask.content = task.content
      foundTask.description = task.description
      foundTask.type = task.type
      foundTask.title = task.title
      foundTask.editable = task.editable
    },
    async updateTask(task: ITaskNoId) {
      const foundTask = this.taskList.find((item) => item.title === task.title)
      if (!foundTask) return
      const payload: ITask = {
        id: foundTask.id,
        title: task.title,
        content: task.content,
        description: task.description,
        type: task.type
      }
      await api.editTask(payload)
      foundTask.content = task.content
      foundTask.description = task.description
    },
    async parseTasks() {
      const response = await api.getTasks()
      const tasks: ITask[] = response.map(
        (task: ITask) =>
          ({
            title: initTaskTitle(task.id),
            id: task.id,
            type: task.type,
            description: task.description,
            content: task.content
          }) as ITask
      )
      this.taskList = JSON.parse(
        JSON.stringify(
          tasks.sort((a, b) => {
            return a.id - b.id
          })
        )
      )
    }
  }
})
