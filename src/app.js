import './app.scss'
import { reactive, setCurrentData, setDataSource } from './reactive'
import { render } from './render'
import { ITEM_HEIGHT } from './config'
import { setAnimationFrame } from './utils'

(function () {
  // 获取DOM元素
  const oScroller = document.querySelector('#J_ScrollWrapper')
  const oList = oScroller.querySelector('.list-wrapper')
  // 对数据做响应式处理
  const $state = reactive(oList)
  const init = () => {
    // 初始化数据
    initData(1, 20)
    // 渲染
    render($state.currentData, $state.paddingSet, oList)
    // 事件处理
    bindEvent()
  }

  const initData = (init, count) => {
    // 设置数据
    setDataSource(init, count)
    // 设置当前页面的数据
    setCurrentData()
  }

  function bindEvent() {
    oScroller.addEventListener('scroll', handleScroll, false)
  }

  function handleScroll() {
    // 使用 requestAnimationFrame 优化
    setAnimationFrame(() => {
      $state.startIndex = Math.floor(this.scrollTop / ITEM_HEIGHT)
    })
  }

  init()
})()
