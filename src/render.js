export function render(currentData, paddingSet, list) {
  const oFragment = document.createDocumentFragment()
  currentData.forEach(item => {
    const oItem = document.createElement('div')
    oItem.className = 'list-item'
    oItem.innerText = item
    oFragment.appendChild(oItem)
  })

  list.appendChild(oFragment)
  updatePaddingSet(paddingSet, list)
}

export function update(currentData, list) {
  // 选出所有 item
  const oItems = list.querySelectorAll('.list-item')
  // 替换 所有 item
  oItems.forEach((item, index) => {
    // 插入新值
    item.innerText = currentData[index]
  })
}

export function updatePaddingSet(paddingSet, list) {
  for (const key in paddingSet) {
    list.style[key] = paddingSet[key] + 'px'
  }
}
