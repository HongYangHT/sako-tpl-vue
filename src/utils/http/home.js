/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: home service
 * @Date: 2019-06-27 16:36:41
 * @LastEditTime: 2019-06-27 17:04:11
 */
import BaseService from './base'

class HomeService extends BaseService {
  /**
   * 初始化接口
   * @param {*} path
   * @param {*} options
   * - 其路径为 `/home/${path}`
   */
  getHomeInit(path, options) {
    return this.get(path, options)
  }
}

export default HomeService
