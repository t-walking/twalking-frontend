import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SearchView from '@/views/SearchView.vue';
import ResultView from '@/views/ResultView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/components/user/LoginForm.vue')
        },
        {
          path: '/join',
          name: 'join',
          component: () => import('@/components/user/RegisterForm.vue')
        },
        {
          path: '/modify',
          name: 'modify',
          component: () => import('@/components/user/ModifyForm.vue')
        }
      ]
    }
  ]
});

export default router;
