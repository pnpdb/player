// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/style.css';
import store from 'storejs';
import iView from 'iview';
import toast from './utils/toast';
Vue.use(iView);

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$toast = toast;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
