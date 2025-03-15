import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SunProtectionTips from '@/components/SunProtectionTips.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/data',
    name: 'data',
    component: () => import('../views/DataView.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/PersonalView.vue')
  },
  {
    path: '/reminder',
    name: 'reminder',
    component: () => import('../views/ReminderView.vue')
  },
  {
    path: '/clothing',
    name: 'clothing',
    component: SunProtectionTips
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/' 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
