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

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(fas)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Clipboard)
app.use(PrimeVue);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
