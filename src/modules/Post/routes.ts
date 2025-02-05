import PostsView from './views/postsView/PostsView.vue';

export enum Routes {
  Posts = '/posts',
}

const routes = [{ path: Routes.Posts, component: PostsView }];

export default routes;
