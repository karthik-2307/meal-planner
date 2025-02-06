import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout-default" */ '@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'recipes',
        name: 'Recipes',
        component: () => import(/* webpackChunkName: "recipes" */ '@/views/RecipesView.vue'),
      },
      {
        path: '/recipe/:id',
        name: 'recipe',
        component: () => import('../views/RecipeView.vue')
      }
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
