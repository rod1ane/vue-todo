import normalize from 'normalize.css'


import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store'

require('@/store/modules/subscriber')

Vue.config.productionTip = false

Vue.use(normalize)

axios.defaults.baseURL = 'https://wunder-1.herokuapp.com/';


store.dispatch('user/attempt', localStorage.getItem('token'))
.then(() => {
  new Vue({
    store,
    render: h => h(App),
  }).$mount('#app')
})

