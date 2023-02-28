import './app.scss'
import { reactive, setCurrentData, setDataSource } from './reactive'
import { render } from './render'
import { ITEM_HEIGHT } from './config'

(function () {
  const oScroller = document.querySelector('#J_ScrollWrapper')
  const oList = oScroller.querySelector('.list-wrapper')
  const $state = reactive(oList)
  const init = () => {
    initData(1, 20)
    render($state.currentData, $state.paddingSet, oList)
    bindEvent()
  }

  const initData = (init, count) => {
    setDataSource(init, count)
    setCurrentData()
    console.log($state.dataSource, $state.currentData)
  }

  function bindEvent() {
    oScroller.addEventListener('scroll', handleScroll, false)
  }

  function handleScroll() {
    $state.startIndex = Math.floor(this.scrollTop / ITEM_HEIGHT)
  }

  init()
})()
