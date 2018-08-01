import fetch from '@/config/fetch';

/** 登录 */
export const login = data => fetch('/session/player', data, 'POST');

/** 获取陪玩信息 */
export const getInfo = () => fetch('/order/player', {}, 'GET');

/** 获取订单 */
export const getOrder = () => fetch('/order/player', {}, 'GET');

/** 接受订单 */
export const receiptOrder = data => fetch('/order/receipt', data, 'PUT');

/** 切换陪玩状态 */
export const changeStatus = data => fetch('/player/status', data, 'PUT');

/** 获取历史订单 */
export const getHistoryOrder = data => fetch('/order/player/history', data, 'GET');