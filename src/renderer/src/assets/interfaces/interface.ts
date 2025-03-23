import { useTools } from '@/use/tools'

const { initTaskTitle } = useTools()
export enum TaskType {
  todo = 'todo',
  inWork = 'inWork',
  finished = 'finished'
}

export interface ITask {
  id: number
  description: string
  content: string
  type: TaskType
  title?: ReturnType<typeof initTaskTitle>
  editable?: boolean
}
export interface ITaskNoId extends Omit<ITask, 'id'> {}
