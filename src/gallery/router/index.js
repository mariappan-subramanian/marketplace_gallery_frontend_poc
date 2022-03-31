import { createRouter, createWebHistory } from 'vue-router'
import Home from '@gallery/views/Home.vue'
const GalleryGrid = () => import('@gallery/views/GalleryGrid.vue');
const Collection = () => import('@gallery/views/Collection.vue');
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
        {
          path: '/collection/:collectionId',
          name: 'collection_route',
          component: Collection,
        },
      ]
    }
  ]
})

export default router
