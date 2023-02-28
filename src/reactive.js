import { ITEM_HEIGHT, MAX_ITEM_COUNT } from './config'
import { getData } from './utils'
import { update, updatePaddingSet } from './render'

const $state = {}

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
    dataSource: {
      get() {
        return data.dataSource
      },
      set(v) {
        data.dataSource = v
        //   set currentData
      }
    },
    currentData: {
      get() {
        return data.currentData
      },
      set(v) {
        data.currentData = v
        update($state.currentData, list)
      }
    },
    startIndex: {
      get() {
        return data.startIndex
      },
      set(v) {
        if ($state.startIndex !== v) {
          data.startIndex = v
          setCurrentData()
          $state.endIndex >= $state.dataSource.length - 1
          && setDataSource($state.dataSource.length + 1, $state.dataSource.length * 2)
          setPaddingSet()
        }
      }
    },
    endIndex: {
      get() {
        return setEndIndex()
      }
    },
    paddingSet: {
      get() {
        return data.paddingSet
      },
      set(v) {
        data.paddingSet = v
        updatePaddingSet($state.paddingSet, list)
      }
    }
  })
  return $state
}

function setEndIndex() {
  const endIndex = $state.startIndex + MAX_ITEM_COUNT
  // 判断是否超出最大值，如果超出，dataSource.length就是最大值
  return $state.dataSource[endIndex] ? endIndex : $state.dataSource.length - 1
}

export function setDataSource(init, count) {
  $state.dataSource = [
    ...$state.dataSource,
    ...getData(init, count)
  ]
}

export function setCurrentData() {
  $state.currentData = $state.dataSource.slice($state.startIndex, $state.endIndex)
}

export function setPaddingSet() {
  $state.paddingSet = {
    paddingTop: $state.startIndex * ITEM_HEIGHT,
    paddingBottom: ($state.dataSource.length - $state.endIndex) * ITEM_HEIGHT
  }
}
