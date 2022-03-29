import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const GalleryGrid = () => import('../views/GalleryGrid.vue');
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GalleryGrid,
      children: [
        {
          path: '/',
          name: 'home_route',
          component: Home,
        },
      ]
    }
  ]
})

export default router
