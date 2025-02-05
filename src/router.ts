import { createWebHistory, createRouter } from 'vue-router';
import postsRoutes, { Routes as PostRoutesEnum } from '@/modules/Post/routes';

const routes = [{ path: '/', redirect: PostRoutesEnum.Posts }, ...postsRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
