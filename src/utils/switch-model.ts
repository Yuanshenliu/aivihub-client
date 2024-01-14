import type { Ref } from 'vue'

let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null
const rate = 4

// @ts-ignore
CanvasRenderingContext2D.prototype.clearArc = function (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  anticlockwise: boolean
) {
  this.globalCompositeOperation = 'destination-out'
  this.fillStyle = 'black'
  // 绘制新图形
  this.beginPath()
  this.arc(x, y, radius, startAngle, endAngle, anticlockwise)
  // 参数分别是：圆心横坐标、纵坐标、半径、开始的角度、结束的角度、是否逆时针
  this.fill()
  this.closePath()
}

// @ts-ignore
CanvasRenderingContext2D.prototype.clearRing = function (
  x: number,
  y: number,
  radiusMax: number,
  radiusMin: number
) {
  this.globalCompositeOperation = 'destination-out'
  this.beginPath()

  this.fillStyle = 'black'
  this.arc(x, y, radiusMax, 0, Math.PI * 2)
  this.moveTo(x + radiusMin, y)
  this.arc(x, y, radiusMin, 0, Math.PI * 2, true)
  this.fill()
  this.closePath()
}

export default async function SwitchMode(
  targetElm: Element,
  model: Ref<boolean>,
  switchFn: Function
) {
  const toDark = !model.value
  const { top, left, height, width } = targetElm.getBoundingClientRect()
  const pointX = left + width / 2
  const pointY = top + height / 2

  const w = window.innerWidth - pointX
  const r = Math.sqrt(Math.pow(w, 2) + Math.pow(pointY, 2))

  const url = await window.electron.invoke('capture')
  await draw(url as string)

  switchFn()

  expand({ pointX, pointY }, r)

  // toDark ? expand({ pointX, pointY }, r) : ring({ pointX, pointY }, r)
}

// function setRootCls(cls: string) {
//   document.querySelector('html')?.setAttribute('class', cls);
// }

function draw(url: string) {
  return new Promise((resolve) => {
    const width = window.innerWidth
    const height = window.innerHeight

    const img = new Image()
    img.src = url

    canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    canvas.style.zIndex = '9999'

    canvas.width = width * rate
    canvas.height = height * rate
    document.body.appendChild(canvas)
    canvas.style.background = 'rgba(200,100,20,0)'

    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    img.onload = function () {
      ctx?.drawImage(img, 0, 0, width * rate, height * rate)
      resolve(true)
    }
  })
}

interface Point {
  pointX: number
  pointY: number
}

function render(fn: () => boolean) {
  window.requestAnimationFrame(() => {
    if (fn()) {
      render(fn)
    }
  })
}

function expand(point: Point, mr: number) {
  let r = 1

  render(() => {
    // @ts-ignore
    ctx?.clearArc(point.pointX * rate, point.pointY * rate, r, 0, 2 * Math.PI)
    r = r + 100
    if (r > mr * rate) {
      const res = document.body.removeChild(canvas)
      res && (ctx = null)
    }

    return r <= mr * rate
  })
}

function ring(point: Point, mr: number) {
  let r = mr - 1,
    count = 0,
    // eslint-disable-next-line prefer-const
    step = 40

  render(() => {
    // @ts-ignore
    ctx?.clearRing(point.pointX * rate, point.pointY * rate, mr * rate, r * rate)
    let nextR = r - step

    if (r < 400 && step > 0.5 && r < 1000) {
      step = 40 - count * 2.5
      count++
    }

    if (nextR <= 0 - step + 1) {
      r = 0
      const res = document.body.removeChild(canvas)
      res && (ctx = null)
    } else if (nextR < 0 && nextR > 0 - step + 1) {
      nextR = 0.01
    }

    if (r < 1000) {
      step = nextR / 20

      if (step <= 40) {
        step = 40
      }
    }

    r = nextR
    return r > 0
  })
}
