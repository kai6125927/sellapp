import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import "./assets/styles/reset.css";


Vue.use(ViewUI)
Vue.use(router)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
