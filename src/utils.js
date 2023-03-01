import { TIME_PER_FPS } from './config'
// 构造数组数据
export function getData(init, count) {
  const arr = []

  for (let i = init; i <= count; i ++) {
    arr.push(i)
  }
  return arr
}

export function setAnimationFrame(cb) {
  let beginTime = Date.now()
  // 浏览器下一次重绘之前安排一个回调函数，以便在下一帧中进行更新
  requestAnimationFrame(function rf() {
    const endTime = Date.now()

    cb()
    if (endTime - beginTime >= TIME_PER_FPS) {
      beginTime = endTime
      requestAnimationFrame(rf)
    }
  })
}
