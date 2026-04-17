import { createRouter, createWebHistory } from 'vue-router';
import { APP_ROUTES } from '@/router/routes';

export const router = createRouter({
  history: createWebHistory(),
  routes: APP_ROUTES
});
