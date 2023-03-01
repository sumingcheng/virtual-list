import { ITEM_HEIGHT, MAX_ITEM_COUNT } from './config'
import { getData } from './utils'
import { update, updatePaddingSet } from './render'

const $state = {}

// 定义一个 data对象 方便之后进行代理
const data = {
  dataSource: [],
  currentData: [],
  startIndex: 0,
  endIndex: 0,
  paddingSet: {
    paddingTop: 0,
    paddingBottom: 0
  }
}

export function reactive(list) {
  Object.defineProperties($state, {
    // 数据
    dataSource: {
      get() {
        return data.dataSource
      },
      set(v) {
        data.dataSource = v
      }
    },
    // 当前页面数据
    currentData: {
      get() {
        return data.currentData
      },
      set(v) {
        data.currentData = v
        // 修改 currentData 数据的同时，也会更新 当前 item
        update(data.currentData, list)
      }
    },
    // 开始下标
    startIndex: {
      get() {
        return data.startIndex
      },
      set(v) {
        // start下标和当前下标不相等，就更新start下标
        if ($state.startIndex !== v) {
          data.startIndex = v
          // 开始下标改变了，当前内容也要改变
          setCurrentData()
          // 最后下标 >= 整体长度 则返回
          $state.endIndex >= $state.dataSource.length - 1
          //   todo 不清晰
          && setDataSource($state.dataSource.length + 1, $state.dataSource.length * 2)
          // 设置pd
          setPaddingSet()
        }
      }
    },
    // 结束下标
    endIndex: {
      get() {
        return setEndIndex()
      }
    },
    // padding 值
    paddingSet: {
      get() {
        return data.paddingSet
      },
      set(v) {
        data.paddingSet = v
        // 设置 pd 时候要更新 DOM 的 pd
        updatePaddingSet($state.paddingSet, list)
      }
    }
  })
  return $state
}

function setEndIndex() {
  // 两屏优化
  const endIndex = $state.startIndex + MAX_ITEM_COUNT * 2
  // 判断是否超出最大值，如果超出，dataSource.length就是最大值
  return $state.dataSource[endIndex] ? endIndex : $state.dataSource.length - 1
}

export function setDataSource(init, count) {
  console.log(...$state.dataSource)
  // 给dataSource重新赋值
  $state.dataSource = [
    ...$state.dataSource,
    ...getData(init, count)
  ]
}

export function setCurrentData() {
  let StartIndex = resetStartIndex()
  // 截取一屏的内容
  $state.currentData = $state.dataSource.slice(StartIndex, $state.endIndex)
}

export function setPaddingSet() {
  let StartIndex = resetStartIndex()
  $state.paddingSet = {
    paddingTop: StartIndex * ITEM_HEIGHT,
    paddingBottom: ($state.dataSource.length - $state.endIndex) * ITEM_HEIGHT
  }
}

export function resetStartIndex() {
  // 初始位置 小于等于 一屏的高度则起始位置依然是 0 因为我们是 2 屏 ，如果起始位置大于一屏高度 则返回差值
  return $state.startIndex <= MAX_ITEM_COUNT ? 0 : $state.startIndex - MAX_ITEM_COUNT
}
