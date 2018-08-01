import axios from 'axios';
import store from 'storejs';
import router from '../router';

/* axios全局设置 */
const http = axios.create();
http.defaults.timeout = 5000;
http.defaults.headers.post['Content-Type'] = 'application/json';
// request拦截器
http.interceptors.request.use(
    response => {
        if(store.has('player')){
            let token = store.get('player');
            response.headers.Authorization = token;
        }
        return response;
    },
    error => {
        console.log(error)
    }
);
// // response拦截器
// http.interceptors.response.use(
  
//   response => {
//     return response.data;
//   },
//   error => {
//     let path = router.history.current.path;
//     if (error && error.response) {
//       switch (error.response.status) {
//         case 400:
//           error.message = '请求错误';
//           break;

//         case 401:
//           error.message = '未授权，请登录';
//           if(path.indexOf('management') > -1){
//             store.remove(EVTAPE_ADMIN);
//             router.replace({
//               name: 'adminLogin'
//             });
//           } else {
//             store.remove(EVTAPE_BASIC);
//             router.replace({
//               name: 'login'
//             });
//           }
//           break;

//         case 403:
//           error.message = '拒绝访问';
//           router.replace({
//             name: 'error403'
//           });
//           break;

//         case 404:
//           error.message = `请求地址出错: ${error.response.config.url}`;
//           router.replace({
//             name: 'error404'
//           });
//           break;

//         case 408:
//           error.message = '请求超时';
//           break;

//         case 500:
//           error.message = '服务器内部错误';
//           router.replace({
//             name: 'error500'
//           });
//           break;

//         case 501:
//           error.message = '服务未实现';
//           break;

//         case 502:
//           error.message = '网关错误';
//           break;

//         case 503:
//           error.message = '服务不可用';
//           break;

//         case 504:
//           error.message = '网关超时';
//           break;

//         case 505:
//           error.message = 'HTTP版本不受支持';
//           break;

//         default:
//       }
//     }
//     return Promise.reject(error.response);
//   }
// );

export default http;
