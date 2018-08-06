
/**
 * 配置开发环境和测试、生产环境之间的接口配置
 *
 * baseURL: 接口地址
 * routerMode: 路由模式
 * baseImageURL: 图片地址
 *
 */
let baseURL = '';

let routerMode = 'history';

if (process.env.NODE_ENV === 'development') {
    // baseURL = 'https://df.evtape.com/api';
    baseURL = 'http://192.168.2.121:8080/api';
} else {
    baseURL = 'https://df.evtape.com/api';
}

export {
    baseURL, routerMode
}