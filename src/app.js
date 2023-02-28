import './app.scss'
import { MAX_ITEM_COUNT } from './config'

console.log(MAX_ITEM_COUNT)
(function () {
  const oScroller = document.querySelector('#J_ScrollWrapper')
  const oList = oScroller.querySelector('.list-wrapper')

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oScroller.addEventListener('scroll', handleScroll, false)
  }

  function handleScroll() {

  }

  init()
})()
