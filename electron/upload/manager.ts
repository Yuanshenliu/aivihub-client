import type { UploadTaskOption } from './uploadTask'
import { UploadTask } from './uploadTask'
import { TaskPack } from './taskPack'
import path from 'node:path'
import { debounce } from 'lodash-es'
import { home } from '../windows/home'
import { SendEvent } from '../events/ipc-event'

import { getRecords } from './recorder'

export function taskManager() {
  const tasks: UploadTask[] = []

  const taskPackObj: Record<string, TaskPack> = {}

  function initTaskQueue() {
    const taskList = getRecords()

    taskList.forEach((option) => {
      tasks.push(new UploadTask(option))
    })

    getTaskList(false)
    notify()
  }

  function getTaskList(record = true) {
    tasks.forEach((task) => {
      if (!taskPackObj[task.taskID])
        taskPackObj[task.taskID] = new TaskPack(task.directory, task.title)

      taskPackObj[task.taskID].onProgress(() => {
        debounce(notify, 16)()
      })

      taskPackObj[task.taskID].addUploadTaskItem(task, record)
    })
  }

  function notify() {
    const queue = []
    for (const [key, value] of Object.entries(taskPackObj)) {
      queue.push(value.calcProgress())
    }

    home.webContents.send(SendEvent.UPLOADING_TASKS, queue)
  }

  function addTask(option: UploadTaskOption & { taskID: string }) {
    option.directory = path.parse(option.path).dir
    const task = new UploadTask(option)
    task.status = 'wait'
    tasks.push(task)
    getTaskList()
  }

  return {
    addTask,
    notify,
    getTaskList,
    initTaskQueue
  }
}
