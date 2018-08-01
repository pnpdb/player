
/**
 * 配置开发环境和测试、生产环境之间的接口配置
 *
 * baseURL: 接口地址
 * routerMode: 路由模式
 * baseImageURL: 图片地址
 *
 */
let baseURL = '';
let baseImageURL = '';

let routerMode = 'history';

if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://192.168.2.233:8080/api';
  baseURL = 'http://192.168.2.121:8080/api';
  baseImageURL = '';
} else {
//   baseURL = 'http://evtape.cn/api';
  baseImageURL = '';
}

export {
  baseURL, routerMode, baseImageURL
}