import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import information from '../components/information.vue'
import item from '../components/item.vue'
import order from '../components/order.vue'
import comment from '../components/comment.vue'

Vue.use(VueRouter)
//-------------------------------------------------------------------------
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


//-------------------------------------------------------------------------
//各个组件定义数组
const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:login},
  {path:'/home',component:home,children:[
    {path:'/myInformation',component:information},
    {path:'/myItem',component:item},
    {path:'/myOrder',component:order},
    {path:'/myComment',component:comment}
  ]}
  
]
//-------------------------------------------------------------------------
const router = new VueRouter({
  routes
})
//-------------------------------------------------------------------------
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to为要访问的路径
  if(to.path==='/login')return next();
  //from是哪个路径跳转而来
  const tokenstr=window.sessionStorage.getItem('username');
  if(!tokenstr)return next('/login');
  //next是一个放行函数
  next();
})



export default router
