import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', name: 'Main', component: Main, children: [
      { path: '/goods', name: 'goods', component: () => import('../views/Goods.vue') },
      { path: '/evaluate', name: 'evaluate', component: () => import('../views/Evaluate.vue') },
      { path: '/merchant', name: 'merchant', component: () => import('../views/Merchant.vue') },
    ]},
    { path: '/notice', name: 'notice', component: () => import('../views/Notice.vue') },
  ]
})
