import Vue from 'vue'
import App from './App.vue'
import Chakra from '@chakra-ui/vue'

Vue.use(Chakra)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
