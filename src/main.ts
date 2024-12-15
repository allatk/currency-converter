import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import VueSelect from 'vue-select'

const app = createApp(App)

app.use(router)

app.component('v-select', VueSelect)

app.mount('#app')
