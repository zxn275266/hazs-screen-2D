import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  //hash模式
  // ,createWebHashHistory 
  // history:createWebHashHistory()
  //hash模式
  //history模式
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/bigscreen',
      component: HomeView
    },
    {
      path:'/bigscreen',
      name:'BigScreen',
      component:()=>import('../views/BigScreenView.vue')
    }
  ]
})

export default router
