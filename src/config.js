export const ITEM_HEIGHT = 101
// 获取高度后/每一项的到高度，然后取最大，也就是如果有小数再+1，但是有可能会出现一屏还有一半的item情况，所以还要再+1
export const MAX_ITEM_COUNT = Math.ceil(document.querySelector('#J_ScrollWrapper').offsetHeight / ITEM_HEIGHT) + 1
