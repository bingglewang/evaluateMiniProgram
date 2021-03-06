import Vue from 'vue'
import App from './App'

import {post,post1} from './utils/api'

Vue.prototype.$post = post
Vue.prototype.$post1 = post1

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
