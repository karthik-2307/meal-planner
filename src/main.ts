/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import router from './router'  
// Components
import App from './App.vue'
const pinia=createPinia();
// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(router)
app.use(pinia);
registerPlugins(app)

app.mount('#app')
