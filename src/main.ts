import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTrash, faPen, faUser, faChartColumn } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)
library.add(faPen)
library.add(faUser)
library.add(faChartColumn)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia)
app.use(router)

app.mount('#app')