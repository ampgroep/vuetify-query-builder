import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { useVuetify } from '@/plugins/vuetify.ts'

createApp(App).use(useVuetify).mount('#app')
