import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import ExampleView from '@/views/example/ExampleView.vue'
import StartView from '@/views/start/StartView.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => {
        return { referralCode: route.query.referralCode }
      }
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
