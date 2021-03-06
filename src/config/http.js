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
// response拦截器
http.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    
    let path = router.history.current.path;
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未授权，请登录';
          router.replace({
            name: 'login'
          });
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

export default http;
