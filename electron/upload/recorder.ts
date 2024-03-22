import type { UploadTaskOption } from './uploadTask'
import { app } from 'electron'
import path from 'node:path'
import fs from 'node:fs'

const recordsQueue: UploadTaskOption[] = []

const userDataPath = app.getPath('userData')
const cacheFile = path.join(userDataPath, 'upload tasks')

console.log(userDataPath)

if (!fs.existsSync(cacheFile)) {
  fs.writeFileSync(cacheFile, '{}')
}

const taskRecords = JSON.parse(fs.readFileSync(cacheFile).toString())

setInterval(async () => {
  const item = recordsQueue.shift()

  if (item) {
    const target = Object.assign(taskRecords, {
      [item.key]: item
    })

    console.log(target)

    fs.writeFileSync(cacheFile, JSON.stringify(target))
  }
}, 16)

export function addRecordsItem(task: UploadTaskOption) {
  recordsQueue.push(task)
}

export function getRecords() {
  console.log(taskRecords)

  return Object.entries<UploadTaskOption>(taskRecords)
    .map<UploadTaskOption>(([_key, task]) => task)
    .sort((a, b) => a.createdTime - b.createdTime)
}
