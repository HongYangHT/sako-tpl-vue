/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 抛出请求
 * @Date: 2019-06-27 15:11:19
 * @LastEditTime: 2019-06-27 17:04:17
 */
import HomeService from './home'

export const homeService = new HomeService({
  basePath: 'home'
})
