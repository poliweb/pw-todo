import {
    createApp
} from 'vue'
import {
    createPinia
} from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import {
    registerSW
} from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
    onOfflineReady() {},
})


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')