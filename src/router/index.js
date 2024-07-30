import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import ExampleView from '@/views/example/ExampleView.vue'
import StartView from '@/views/start/StartView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/example',
      name: 'example',
      component: ExampleView
    },
    {
      path: '/start',
      name: 'start',
      component: StartView
    }
  ]
})

export default router
