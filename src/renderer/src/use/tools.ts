export const useTools = () => {
  function initTaskTitle(taskCount: number) {
    return `Task-${taskCount}`
  }

  return {
    initTaskTitle
  }
}
