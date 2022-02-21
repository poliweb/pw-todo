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
import {
    useRegisterSW
} from 'virtual:pwa-register/vue'

const updateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
    onOfflineReady() {},
})

const intervalMS = 60 * 60 * 1000

const updateServiceWorker = useRegisterSW({
    onRegistered(r) {
        r && setInterval(() => {
            r.update()
        }, intervalMS)
    }
})


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')