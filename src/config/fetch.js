import {baseURL} from "./env";
import http from '../config/http';

const timeoutResponse = {
  "meta":
  {
    "code":-1,
    "message":"请求服务失败"
  }
};

export default async (url = '', data = {}, method = 'GET') => {
  method = method.toUpperCase();
  url = baseURL + url;

  if (method === 'GET') {
    let params = '';
    Object.keys(data).forEach(key => {
      params += key + '=' + data[key] + '&';
    });

    if (params !== '') {
      params = params.substr(0, params.lastIndexOf('&'));
      url = url + '?' + params;
    }

    return await http.get(url)
      .then(response => response)
      .catch(err => {
        return timeoutResponse;
      });
  }

  if (method === 'POST' || method === 'PUT') {
    return await http({
      method: method,
      url: url,
      data: data
    }).then(response => response)
      .catch(function (err) {
        return timeoutResponse;
      });
  }

  if (method === 'DELETE') {
    return await http.delete(url)
      .then(response => response)
      .catch(function (err) {
        return timeoutResponse;
      });
  }
}

