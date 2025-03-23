import { ITask, ITaskNoId } from '@/assets/interfaces/interface'

const port = import.meta.env.VITE_BACK_PORT ?? 3000
const domain = import.meta.env.VITE_DOMAIN ?? 'localhost'
const addr = `http://${domain}:${port}`
console.log(addr)
export const useApi = () => {
  async function getTasks() {
    const response = await fetch(`${addr}/tasks`)
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Ошибка HTTP: ' + response.status)
    }
  }

  async function addTask(task: ITaskNoId) {
    const response = await fetch(`${addr}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(task)
    })
    return response.json()
  }

  async function editTask(task: ITask) {
    return await fetch(`${addr}/tasks/put`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(task)
    })
  }

  async function deleteTask(id: number) {
    return await fetch(`${addr}/tasks/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        id
      })
    })
  }

  return {
    getTasks,
    addTask,
    editTask,
    deleteTask
  }
}
