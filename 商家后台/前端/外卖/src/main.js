import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'
import './plugins/element.js'
import './assets/all.css'
import axios from 'axios'
//-------------------------------------------------------------------------
//axios根路径就是后端nodejs的地址监听端口3000
axios.defaults.baseURL='http://localhost:3000/'
//配置axios的请求拦截器
axios.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers.Authorization=window.sessionStorage.getItem('username');
  return config;
  },error => {
  // Do something with request error
  return Promise.reject(error);
  });
//添加一个vue属性使得之后全局的vue对象都可以使用axios的方法
Vue.prototype.$http=axios
//-------------------------------------------------------------------------
Vue.config.productionTip = false

new Vue({
  //store,
  router,
  render: h => h(App)
}).$mount('#app')
