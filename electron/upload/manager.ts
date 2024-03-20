import type { UploadTaskOption } from './uploadTask'
import { UploadTask } from './uploadTask'
import { TaskPack } from './taskPack'
import { ref } from 'vue'
import path from 'node:path'
import { debounce } from 'lodash-es'
import { home } from '../windows/home'
import { SendEvent } from '../events/ipc-event'

export function taskManager() {
  const tasks = ref<UploadTask[]>([])

  const taskPackObj: Record<string, TaskPack> = {}

  function getTaskList() {
    tasks.value.forEach((task) => {
      if (!taskPackObj[task.directory]) taskPackObj[task.directory] = new TaskPack()

      taskPackObj[task.directory].onProgress(() => {
        console.log(3333)
        debounce(notify, 16)()
      })

      taskPackObj[task.directory].addUploadTaskItem(task)
    })
  }

  function notify() {
    const queue = []
    for (const [key, value] of Object.entries(taskPackObj)) {
      queue.push(value.calcProgress())
    }

    home.webContents.send(SendEvent.UPLOADING_TASKS, queue)
  }

  function addTask(option: UploadTaskOption) {
    option.directory = path.parse(option.path).dir
    const task = new UploadTask(option)
    task.status = 'wait'
    tasks.value.push(task)
    getTaskList()
  }

  return {
    addTask
  }
}
