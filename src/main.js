import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Clipboard from 'v-clipboard'

import PrimeVue from 'primevue/config';


//in main.js
import 'primevue/resources/themes/lara-light-green/theme.css'
import "/node_modules/primeflex/primeflex.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Clipboard)
app.use(PrimeVue);

app.mount('#app')
