import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
  onOfflineReady() {},
})

const app = createApp(App)



app.use(createPinia())
app.use(router)

app.mount('#app')

console.log(
  `\u2728 Code writer of the high-quality code: 🧔🏼‍♂️ %c PoliWeb %c Lev Tolstoy`,
  'color: black; border-radius: 6px 0 0 6px; padding: 2px 2px 1px 10px; background: #00ff77',
  'color: #fff; border-radius: 0 6px 6px 0; padding: 2px 10px 1px 2px; background: #ff00b2'
)
