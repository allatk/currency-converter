import { createRouter, createWebHistory } from 'vue-router'
import { ROUTE_NAMES } from '@/router/route-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.HOME,
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: ROUTE_NAMES.CONVERTER,
          component: () => import('@/views/ConverterView.vue'),
        },
        {
          path: '/rates',
          name: ROUTE_NAMES.RATES,
          component: () => import('@/views/RatesView.vue'),
        },
      ],
    },
  ],
})

export default router
