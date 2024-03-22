const KB = 1024
const MB = 1048576
const GB = 1073741824

const _90MB = MB * 0.9
const _90GB = GB * 0.9

export function calcSize(size: number) {
  if (size > _90GB) {
    return Number(size / GB).toFixed(2) + ' GB'
  }

  if (size > _90MB) {
    return Number(size / MB).toFixed(2) + ' MB'
  }

  return Number(size / KB).toFixed(2) + ' KB'
}
