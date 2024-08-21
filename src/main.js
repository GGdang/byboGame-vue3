import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
app.use(vuetify)
app.use(VueQueryPlugin)
