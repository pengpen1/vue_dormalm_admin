import { GET } from '../http.js'
import goods from '../urls/goods'

// 获取文章详情
export function getGoodsetail(params) {
  return GET({
    url: goods.detail,
    params
  })
}

// 获取商品列表
export function getGoodsList(params) {
  return GET({
    url: goods.list,
    params
  })
}
