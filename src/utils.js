import { TIME_PER_FPS } from './config'

export function getData(init, count) {
  const arr = []

  for (let i = init; i <= count; i ++) {
    arr.push(i)
  }

  return arr
}

export function setAnimationFrame(cb) {
  let beginTime = Date.now()

  requestAnimationFrame(function rf() {
    const endTime = Date.now()
    cb()
    if (endTime - beginTime >= TIME_PER_FPS) {
      beginTime = endTime
      requestAnimationFrame(rf)
    }
  })
}
