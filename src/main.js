import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import auth from '@/utils/auth';
import locale from 'iview/src/locale/lang/en-US';



Vue.config.productionTip = false

Vue.use(iView, { locale });

Vue.directive("auth", auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')