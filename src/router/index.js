import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '../views/TodoPage.vue'
import AboutPage from '../views/AboutPage.vue'

const routes = [
  { path: '/', name: 'Todo', component: TodoPage },
  { path: '/about', name: 'About', component: AboutPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
