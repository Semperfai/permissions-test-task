import { createApp } from 'vue'

import { router, pinia } from './providers'
import './styles/main.css'
import App from './App.vue'
export const app = createApp(App).use(pinia).use(router)
